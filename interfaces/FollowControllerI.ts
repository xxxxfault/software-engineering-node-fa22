import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowAnotherUser (req: Request, res: Response): void;
    userUnfollowAnotherUser (req: Request, res: Response): void;
    findAllUserFollowing (req: Request, res: Response): void;
    findAllUserFollower (req: Request, res: Response): void;
};