import { Types } from "mongoose";


export interface Score{
    _id: string,
    score: number,
    userId: Types.ObjectId;
    gameId: Types.ObjectId;
}