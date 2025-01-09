import { Schema, model } from 'mongoose';
import { Score } from '../interfaces/Score';

const scoreSchema = new Schema<Score>({
    score: {type: Number},
    owner: {type: String}
  });
  
  export const ScoreModel = model<Score>('Score', scoreSchema);