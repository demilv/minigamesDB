import { Schema, model } from 'mongoose';
import { Score } from '../interfaces/Score';

const scoreSchema = new Schema<Score>({
    score: {type: Number},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true }
  });
  
  export const ScoreModel = model<Score>('Score', scoreSchema);