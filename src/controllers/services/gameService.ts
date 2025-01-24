import { GameModel } from '../../Schemas/GameS';
import { Game as GameInterface } from '../../interfaces/Game';
import { APIError } from '../../errors/APIerror';
import { Types } from 'mongoose';


export class Game {

    static async fetchAll() : Promise<GameInterface[]> {
        try{
            const games = await GameModel.find({}).exec();
            return games as GameInterface[];
        } catch(error) {
            throw new APIError(`Games not found: ` , 404);
        }
    }

   
    static async getGame(id: string) {    
        const objectId = new Types.ObjectId(id); 

        const game = await GameModel.findById(objectId).exec(); 
        
        if (!game) {
            throw new APIError(`Game not found: ${id}`, 404);            
        }
        return game;
    }
    

    static async save(newGame: GameInterface): Promise<GameInterface> {
        try {
            const game = new GameModel(newGame);
            await game.save();
            return game as GameInterface;
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