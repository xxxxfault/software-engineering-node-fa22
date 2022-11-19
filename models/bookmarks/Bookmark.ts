/**
 * @file Bookmark data type representing relationship between
 * users and tuits, as in a user bookmarks a tuit
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmark relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit The tuit that bookmarked by the user
 * @property {User} bookmarkedBy User who bookmarked the message
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User,

};