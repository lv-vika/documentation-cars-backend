import { getRandomNumber } from '../../utils/helper';

export const generateDefaultFineData = async (fineInstance): Promise<void> => {
  await fineInstance.createFineAmount({
    hryvnias: getRandomNumber(500, 1000),
    kopiykas: getRandomNumber(0, 99)
  });
};
