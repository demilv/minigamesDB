import { Types } from "mongoose";


export interface User {
    _id: string,
    name: string,
    email: string,
    phone: string,
    pass: string,
    owned: Types.ObjectId[]
}