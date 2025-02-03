import { GameModel } from '../../Schemas/GameS';
import { UserModel } from '../../Schemas/UserS';
import { faker } from '@faker-js/faker';

const getRandomGame = (array: string[]) => {
  const randomLength = faker.number.int({ min: 0, max: array.length });
  return array.sort(() => 0.5 - Math.random()).slice(0, randomLength); 
};

const createRandomUsers = async (count: number) => {

  const allGames = await GameModel.find({}, '_id'); 
  const gameIds = allGames.map(game => game._id);   

  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(
      new UserModel({
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        phone: faker.phone.number().toString(),
        pass: faker.internet.password(),
        owned: getRandomGame(gameIds),
      })
    );
  }

  return users;
};

export const randomUsers = async () => await createRandomUsers(6);