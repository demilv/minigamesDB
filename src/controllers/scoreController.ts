import { Request, Response, NextFunction } from 'express';
import { Score as ScoreService } from './services/scoreService';
import { Score as ScoreInterface } from '../interfaces/Score';
import { Types } from 'mongoose';

const fetchAllScores = async () => {
    try {
        const scores = await ScoreService.fetchAll();
        if (!scores) {
            throw new Error('Scores not found');
        }
        return scores;
    } catch (e) {
        throw e;
    }
};


export const getAllScores = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const scores = await fetchAllScores();
        return res.json( scores );
    } catch (e) {
        return next(e);
    }
};


export const getOneScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const scores = await fetchAllScores();
        const scoreIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(scoreIndex) || scoreIndex < 0 || scoreIndex >= scores.length) {
            return res.status(404).json({ message: 'Score not found' });
        }

        const score = scores[scoreIndex];
        return res.status(200).json(score);
    } catch (e) {       
            return next(e);
        
    }
};

export const setNewScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newScore: ScoreInterface = req.body;
        if (!newScore.score || !newScore.ownerId ||
            !newScore.gameId) 
        {            
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const savedScore = await ScoreService.save(newScore);
        console.log(savedScore)
        return res.status(201).json({ score: savedScore });
    } catch (e) {
        return next(e);
    }
};

export const updateScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;  
        const objectId = new Types.ObjectId(id);

        const updatedScoreData: Partial<ScoreInterface> = req.body;        
        const updatedScore = await ScoreService.Edit(objectId, updatedScoreData);

        if (!updatedScore) {
            return res.status(404).json({ message: 'Score not found' });
        }
        return res.json({ score: updatedScore });
    } catch (e) {
        return next(e);
    }
};

export const deleteScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;  
        const objectId = new Types.ObjectId(id);
        
        const deletedScore = await ScoreService.Delete(objectId);  
        
        if (!deletedScore) {
            return res.status(404).json({ message: 'Score not found' });
        }
        
        return res.json({ message: 'Score deleted successfully' });
    } catch (e) {
        return next(e);
    }
};

