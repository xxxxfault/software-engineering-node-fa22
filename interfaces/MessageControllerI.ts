import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessageAnotherUser (req: Request, res: Response): void;
    userDeleterAMessage (req: Request, res: Response): void;
    findAllUserSentMessage (req: Request, res: Response): void;
    findAllUserReceivedMessage (req: Request, res: Response): void;
};