/**
 * @file Declares Follow data type representing relationship between
 * two users, like one user follow another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents Follow relationship between two users,
 * as in a user follow another user
 * @property {User} userFollowed User who follows the other user
 * @property {User} userFollowing User who is followed
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User,
};