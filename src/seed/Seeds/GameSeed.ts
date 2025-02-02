import { GameModel } from '../../Schemas/GameS';
import { faker } from '@faker-js/faker';

const createRandomGame = () => {

return new GameModel({
    name: faker.commerce.productName(),
    bImage: faker.image.url(),
    price: faker.number.float({ min: 5, max: 15, fractionDigits: 2 }),
    status: faker.datatype.boolean(),    
  });
};

export const randomGames = Array.from({ length: 4 }, () => createRandomGame());
