import { Types } from "mongoose";


export interface Score{
    _id: string,
    score: number,
    ownerId: Types.ObjectId;
    gameId: Types.ObjectId;
}