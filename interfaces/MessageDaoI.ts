import Message from "../models/messages/Message";
/**
 * @file Declares API for messages related data access object methods
 */
export default interface MessageDaoI {
    userMessageAnotherUser (sentId: string, receiveId: string): Promise<Message>;
    userDeleterAMessage (uid: string, mid: string): Promise<any>;
    findAllUserSentMessage (uid: string): Promise<Message[]>;
    findAllUserReceivedMessage (uid: string): Promise<Message[]>;
};