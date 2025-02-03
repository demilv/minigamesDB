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

  const createRandomScore = async (count:number) => {
    const allUsers = await UserModel.find({}, '_id');
    const userIds = allUsers.map(user => user._id);
  
    const allGames = await GameModel.find({}, '_id');
    
    const randomUser = faker.helpers.arrayElement(userIds);

    const randomGameIndex = faker.number.int({ min: 0, max: allGames.length - 1 });
    console.log(randomGameIndex)
    const randomGameId = allGames[randomGameIndex]._id;
    console.log(randomGameId)
    

    const savedScores = []
    for(let i = 0; i< count; i++){
      const score = generateScore(randomGameIndex);
      savedScores.push(
        new ScoreModel({
          score: score,
          userId: randomUser,  
          gameId: randomGameId, 
        })
      )
    }
    return savedScores;
  };

export const randomScores = async () => await createRandomScore(12);