import Message from "../models/messages/Message";
/**
 * @file Declares API for messages related data access object methods
 */
export default interface MessageDaoI {
    userMessageAnotherUser (from:string,to:string,message:Message): Promise<Message>;
    userDeleteAMessage (from: string, to: string): Promise<any>;
    findAllUserSentMessage (uid: string): Promise<Message[]>;
    findAllUserReceivedMessage (uid: string): Promise<Message[]>;
};