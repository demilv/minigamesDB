import { GameModel } from "../Schemas/GameS";
import { UserModel } from "../Schemas/UserS";
import { ScoreModel } from "../Schemas/ScoreS";
import { randomGames } from "./Seeds/GameSeed";
import { randomScores } from "./Seeds/ScoreSeed";
import { randomUsers } from "./Seeds/UserSeed";
import checkUser, {hashPassword} from "../HashingChecking/HashingChecking/HashCheck";
import dotenv from 'dotenv'
import { connect, connection } from "mongoose";

dotenv.config()

export const loginUser = {
  name: 'demilv',
  pass: 'Pass123'
};

export const exampleUser = new UserModel({
  name: 'demilv',
  email: 'demilv@gmail.com',
  phone: '123456789', 
  pass: 'Pass123',
  owned: []
});

export async function initializeDatabase() {
  try {
    await connect(`mongodb+srv://gonzalocano:${process.env.BASEKEY}@cluster0.tkcwqd3.mongodb.net/${process.env.BASE}?retryWrites=true&w=majority&appName=Cluster0`);   

    await connection.db.dropCollection('scores');
    await connection.db.dropCollection('users');
    await connection.db.dropCollection('games');    

    exampleUser.pass = await hashPassword(exampleUser.pass);
    await exampleUser.save();

    const authenticated = await checkUser(loginUser.name, loginUser.pass);
    if (!authenticated) {
      console.log('Acceso denegado');
      return;
    }

    await GameModel.insertMany(randomGames);
    const users = await randomUsers(); 
    await UserModel.insertMany(users);
    const scores = await randomScores();
    await ScoreModel.insertMany(scores);

    console.log('Datos insertados correctamente');
  } catch (err) {
    console.error('Error:', err);
  }
}


initializeDatabase().catch(err => console.log(err));