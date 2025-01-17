import { GameModel } from '../../Schemas/GameS';
import { UserModel } from '../../Schemas/UserS';
import { faker } from '@faker-js/faker';

const getRandomGame = (array: string[]) => {
  const randomLength = faker.number.int({ min: 0, max: array.length });
  return array.sort(() => 0.5 - Math.random()).slice(0, randomLength); 
};

const createRandomUser = async () => {
  const allGames = await GameModel.find({}, '_id'); 
  const gameIds = allGames.map(game => game._id);   

return new UserModel({
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.number().toString(),
    pass: faker.internet.password(),
    owned: getRandomGame(gameIds),
  });
};

export const randomUsers = Array.from({ length: 6 }, createRandomUser);