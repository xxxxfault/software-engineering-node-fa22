/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Request, Response,Express} from "express";
import Message from "../models/messages/Message";

/**
 * @class MessageController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET api/users/:sender/messages to retrieve all messages the users sent
 *     </li>
 *    <li>GET api/users/:receiver/messages to retrieve all messages the users received
 *     </li>
 *     <li>POST api/users/:sender/messages/:receiver to record that a user send message to another user
 *     </li>
 *     <li>DELETE api/users/:sender/messages/:receiver to record that a user
 *     delete a message to another user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing bookmarks CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */

export default class MessageController implements MessageControllerI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController : MessageController| null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */

    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/api/users/:sender/messages", MessageController.messageController.findAllUserSentMessage);
            app.get("/api/users/messages/:receiver", MessageController.messageController.findAllUserReceivedMessage);
            app.post("/api/users/:sender/messages/:receiver", MessageController.messageController.userMessageAnotherUser);
            app.delete("/api/users/:sender/messages/:receiver", MessageController.messageController.userDeleterAMessage);
        }
        return MessageController.messageController;
    }
    private constructor() {}

    /**
     * Retrieves all messages received by the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter receiver representing user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllUserReceivedMessage = (req:Request, res: Response)=>
    MessageController.messageDao.findAllUserReceivedMessage(req.params.receiver)
        .then((messages: Message[] )=>res.json(messages));

    /**
     * Retrieves all messages sent by the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter sender representing user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllUserSentMessage = (req:Request, res: Response)=>
        MessageController.messageDao.findAllUserSentMessage(req.params.sender)
            .then((messages: Message[] )=>res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters sender and receiver representing the message relationship
     * @param {Response} res Represents response to client, including status
     * on whether deleting the following relationship was successful or not
     */

    userDeleterAMessage = (req: Request, res: Response)=>
        MessageController.messageDao.userDeleteAMessage(req.params.sender,req.params.receiver)
            .then(status =>res.send(status));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters  sender and receiver representing the message relationship
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message relationship that was inserted in the
     * database
     */
    userMessageAnotherUser= (req: Request, res: Response)=>
        MessageController.messageDao.userMessageAnotherUser(req.params.sender,req.params.receiver,req.body)
            .then((message: Message) => res.json(message));
}