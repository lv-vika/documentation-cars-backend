import { Response } from 'express';

export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

export const handleEndpointError = (e: Error, res: Response, status: number) => {
  console.log(e);
  const errorMessage = e.name === 'CustomError' ? e.message : 'Server error!';
  res.status(status).send({ success: false, error: errorMessage });
  return;
};
