import { Types } from "mongoose";


export interface Score{
    _id: string,
    score: number,
    owner: string,
    gameId: Types.ObjectId;
}