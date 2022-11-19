import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface DislikeDaoI {
    findAllTuitsDislikedByUser (uid: string): Promise<Dislike[]>;
    userUndislikesTuit (tid: string, uid: string): Promise<any>;
    userDislikesTuit (tid: string, uid: string): Promise<Dislike>;
    countHowManyDislikedTuit(tid:string):Promise<number>;
};