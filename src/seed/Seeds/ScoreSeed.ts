import { ScoreModel } from '../../Schemas/ScoreS';
import { faker } from '@faker-js/faker';
import { UserModel } from '../../Schemas/UserS';
import { GameModel } from '../../Schemas/GameS';

const generateScore = (gameIndex: number) => {
    if (gameIndex === 0) {
      return faker.number.int({ min: 1, max: 5 });
    }
    else{
      return faker.number.int({ min: 10, max: 300 });
    }
  };

  const createRandomScore = async () => {
    const allUsers = await UserModel.find({}, '_id');
    const userIds = allUsers.map(user => user._id);
  
    const allGames = await GameModel.find({}, '_id');
    
    const randomUser = faker.helpers.arrayElement(userIds);
    
    const randomGameIndex = faker.number.int({ min: 0, max: allGames.length - 1 });
    const randomGameId = allGames[randomGameIndex]._id;
    
    const score = generateScore(randomGameIndex);
  
    return new ScoreModel({
      score: score,
      owner: randomUser,  
      gameId: randomGameId, 
    });
  };

export const randomScores = Array.from({ length: 12 }, createRandomScore);