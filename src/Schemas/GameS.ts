import { Schema, model } from 'mongoose';
import { Game } from '../interfaces/Game';

const gameSchema = new Schema<Game>({
    name: {type: String},
    bImage: {type: String},
    price: {type: Number},
    status: {type: Boolean},
  });
  
  export const GameModel = model<Game>('Game', gameSchema);