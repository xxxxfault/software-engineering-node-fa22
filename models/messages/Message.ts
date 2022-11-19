/**
 * @file Declares Message data type representing relationship between
 * two users, like one user message another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents Message relationship between two users,
 * as in a user message another user
 * @property {string} message the content of that message
 * @property {User} from User who sent the message
 * @property {User} to User who receive the message
 * @property {Date} date the date of that message
 */

export default interface Message {
    message: string,
    from: User,
    to: User,
    date?: Date,
};