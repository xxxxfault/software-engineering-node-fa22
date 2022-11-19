import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllTuitsDislikedByUser (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userTogglesTuitDislikes (req: Request, res: Response): void;
};