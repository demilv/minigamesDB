import { gameModel } from '../../Schemas/GameS';
import { faker } from '@faker-js/faker';

const createRandomGame = () => {

return new gameModel({
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    bImage: faker.internet.img(),
    price: faker.number(),
    status: faker.internet.password(),
    //owned
  });
};

export const randomGames = Array.from({ length: 4 }, createRandomGame);