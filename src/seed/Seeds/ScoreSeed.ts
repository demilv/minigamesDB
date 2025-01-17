

import { ScoreModel } from '../../Schemas/ScoreS';
import { faker } from '@faker-js/faker';

const createRandomScore = () => {

return new ScoreModel({
    score: 
    owner: 
    gameId: 
  });
};

export const randomUsers = Array.from({ length: 12 }, createRandomScore);