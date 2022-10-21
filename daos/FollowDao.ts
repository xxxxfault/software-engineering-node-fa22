import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    findAllUserFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    findAllUserFollowing= async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    userFollowAnotherUser = async (followedId: string, followingId: string): Promise<any> =>
        FollowModel.create({userFollowed:followedId,userFollowing:followingId});

    userUnfollowAnotherUser= async (followedId: string, followingId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed:followedId,userFollowing:followingId});

}