import { getRandomNumber } from '../../utils/helper';

export const generateDefaultClientData = async (clientInstance): Promise<void> => {
  await clientInstance.createBalance({
    hryvnias: getRandomNumber(5000, 20000),
    kopiykas: getRandomNumber(0, 99)
  });
};
