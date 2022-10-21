import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    findAllUserReceivedMessage = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to:uid})
            .populate("from")
            .exec();

    findAllUserSentMessage= async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from:uid})
            .populate("to")
            .exec();

    userDeleteAMessage = async (from: string, to: string): Promise<any> =>
        MessageModel.deleteOne({from:from,to:to})

    userMessageAnotherUser= async (from: string, to :string, message:Message): Promise<Message> =>
        MessageModel.create({...message,from:from,to:to});
}