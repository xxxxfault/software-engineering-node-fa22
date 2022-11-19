
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import DislikeDaoI from "../interfaces/DislikeDaoI";
import Dislike from "../models/dislikes/Dislike";


export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    countHowManyDislikedTuit =
        async (tid:string) =>
            DislikeModel.count({tuit: tid});

    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    findUserDislikesTuit =
        async (uid:string, tid:string) =>
            DislikeModel.findOne(
                {tuit: tid, dislikedBy: uid});
}