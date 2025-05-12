import { Request, Response, NextFunction } from 'express';
import { Game as GameService } from './services/gameService';
import { Game as GameInterface } from '../interfaces/Game';
import { Types } from 'mongoose';

const fetchAllGames = async () => {
    try {
        const games = await GameService.fetchAll();
        if (!games) {
            throw new Error('Games not found');
        }
        return games;
    } catch (e) {
        throw e;
    }
};


export const getAllGames = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await fetchAllGames();
        return res.json( games );
    } catch (e) {
        return next(e);
    }
};


export const getOneGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await fetchAllGames();
        const gameIndex = parseInt(req.params.id, 10)-1;

        if (isNaN(gameIndex) || gameIndex < 0 || gameIndex >= games.length) {
            return res.status(404).json({ message: 'Game not found' });
        }

        const game = games[gameIndex];
        return res.status(200).json(game);
    } catch (e) {       
            return next(e);
        
    }
};

export const setNewGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newGame: GameInterface = req.body;
        if (!newGame.name || !newGame.bImage ||
            !newGame.price || !newGame.status || newGame.review || newGame.instructions) 
        {            
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const savedGame = await GameService.save(newGame);
        console.log(savedGame)
        return res.status(201).json({ game: savedGame });
    } catch (e) {
        return next(e);
    }
};

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;  
        const objectId = new Types.ObjectId(id);

        const updatedGameData: Partial<GameInterface> = req.body;        
        const updatedGame = await GameService.Edit(objectId, updatedGameData);

        if (!updatedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        return res.json({ game: updatedGame });
    } catch (e) {
        return next(e);
    }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;  
        const objectId = new Types.ObjectId(id);
        
        const deletedGame = await GameService.Delete(objectId);  
        
        if (!deletedGame) {
            return res.status(404).json({ message: 'Game not found' });
        }
        
        return res.json({ message: 'Game deleted successfully' });
    } catch (e) {
        return next(e);
    }
};

