import { ScoreModel } from '../../Schemas/ScoreS';
import { Score as ScoreInterface } from '../../interfaces/Score';
import { APIError } from '../../errors/APIerror';
import { Types } from 'mongoose';


export class Score {

    static async fetchAll() : Promise<ScoreInterface[]> {
        try{
            const scores = await ScoreModel.find({}).exec();
            return scores as ScoreInterface[];
        } catch(error) {
            throw new APIError(`Scores not found: ` , 404);
        }
    }

   
    static async getScore(id: string) {    
        const objectId = new Types.ObjectId(id); 

        const score = await ScoreModel.findById(objectId).exec(); 
        
        if (!score) {
            throw new APIError(`Score not found: ${id}`, 404);            
        }
        return score;
    }
    

    static async save(newScore: ScoreInterface): Promise<ScoreInterface> {
        try {
            const score = new ScoreModel(newScore);
            await score.save();
            return score as ScoreInterface;
        } catch (error) {
            throw new APIError(`Scores not saved: ` , 404);
        }
    }

    static async Edit(id: Types.ObjectId, updatedScoreData: Partial<ScoreInterface>): Promise<ScoreInterface | null> {
        try {
            const updatedScore = await ScoreModel.findByIdAndUpdate(id, updatedScoreData, { new: true }).exec();
            return updatedScore as ScoreInterface | null;
        } catch (error) {
            throw new APIError(`Scores not edited: ${id}` , 404);
        }
    }

    static async Delete(id: Types.ObjectId): Promise<ScoreInterface | null> {
        try {
            const deletedScore = await ScoreModel.findByIdAndDelete(id).exec();
            return deletedScore as ScoreInterface | null;
        } catch (error) {
            throw new APIError(`Scores not deleted: ${id}` , 404);
        }
    }
}