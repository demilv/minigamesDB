

import { ScoreModel } from '../../Schemas/ScoreS';
import { faker } from '@faker-js/faker';

const createRandomScore = () => {

return new ScoreModel({
    score: `${faker.person.firstName()} ${faker.person.lastName()}`,
    owner: faker.internet.email(),
    gameId: faker.phone.number().toString(),
    //owned
  });
};

export const randomUsers = Array.from({ length: 10 }, createRandomScore);