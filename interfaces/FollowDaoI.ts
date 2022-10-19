import Follow from "../models/follows/Follow";

/**
 * @file Declares API for follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowAnotherUser (followingId: string, followedId: string): Promise<Follow>;
    userUnfollowAnotherUser (followingId: string, followedId: string): Promise<any>;
    findAllUserFollowing (uid: string): Promise<Follow[]>;
    findAllUserFollower (uid: string): Promise<Follow[]>;
};