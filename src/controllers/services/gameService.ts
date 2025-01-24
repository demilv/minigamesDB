import { GameModel } from '../../Schemas/GameS';
import { Game as GameInterface } from '../../interfaces/Game';
import { APIError } from '../../errors/APIerror';
import { Types } from 'mongoose';


export class Game {

    static async fetchAll() : Promise<GameInterface[]> {
        try{
            const users = await GameModel.find({}).exec();
            return users as GameInterface[];
        } catch(error) {
            throw new APIError(`Games not found: ` , 404);
        }
    }

   
    static async getGame(id: string) {    
        const objectId = new Types.ObjectId(id); 

        const user = await GameModel.findById(objectId).exec(); 
        
        if (!user) {
            throw new APIError(`Game not found: ${id}`, 404);            
        }
        return user;
    }
    

    static async save(newGame: GameInterface): Promise<GameInterface> {
        try {
            const user = new GameModel(newGame);
            await user.save();
            return user as GameInterface;
        } catch (error) {
            throw new APIError(`Games not saved: ` , 404);
        }
    }

    static async Edit(id: Types.ObjectId, updatedGameData: Partial<GameInterface>): Promise<GameInterface | null> {
        try {
            const updatedGame = await GameModel.findByIdAndUpdate(id, updatedGameData, { new: true }).exec();
            return updatedGame as GameInterface | null;
        } catch (error) {
            throw new APIError(`Games not edited: ${id}` , 404);
        }
    }

    static async Delete(id: Types.ObjectId): Promise<GameInterface | null> {
        try {
            const deletedGame = await GameModel.findByIdAndDelete(id).exec();
            return deletedGame as GameInterface | null;
        } catch (error) {
            throw new APIError(`Games not deleted: ${id}` , 404);
        }
    }
}