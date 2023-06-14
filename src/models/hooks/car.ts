import { getRandomNumber } from '../../utils/helper';

export const generateDefaultCarData = async (carInstance): Promise<void> => {
  await carInstance.createRentalCost({
    hryvnias: getRandomNumber(1000, 10000),
    kopiykas: getRandomNumber(0, 99)
  });
};
