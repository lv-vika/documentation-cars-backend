import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { handleEndpointError } from '../utils/errorHandler';

const authConfig = config.get('authConfig');

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['token'] || '';
    const { id } = jwt.verify(token, authConfig.secret);
    //@ts-ignore
    req.client = { id };
    next();
  } catch (e) {
    handleEndpointError(e, res, 401);
  }
};
