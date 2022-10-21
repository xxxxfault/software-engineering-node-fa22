/**
 * @file Controller RESTful Web service API for follows resource
 */

import FollowControllerI from "../interfaces/FollowControllerI";
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import Follow from "../models/follows/Follow";


/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/following to retrieve all the users the user is following
 *     </li>
 *      <li>GET /api/users/:uid/followers to retrieve all followers of that users
 *     </li>
 *     <li>POST /api/users/:follower/follows/:followed to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:follower/unfollows/:followed to record that a user
 *     no londer follow another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing bookmarks CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/following", FollowController.followController.findAllUserFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUserFollower);
            app.post("/api/users/:follower/follows/:followed", FollowController.followController.userFollowAnotherUser);
            app.delete("/api/users/:follower/unfollows/:followed", FollowController.followController.userUnfollowAnotherUser);
        }
        return FollowController.followController;
    }

    private constructor() {
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters followingId and followedId representing the user that is following another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new following relationship that was inserted in the
     * database
     */
    userFollowAnotherUser = (req: Request, res: Response)=>
        FollowController.followDao.userFollowAnotherUser(req.params.followed,req.params.follower)
            .then(follows=>res.json(follows));
    /**
     * @param {Request} req Represents request from client, including the
     * path parameters follower and followed representing the user that is unfollowing another user
     * @param {Response} res Represents response to client, including status
     * on whether deleting the following relationship was successful or not
     */

    userUnfollowAnotherUser = (req: Request, res: Response)=>
        FollowController.followDao.userUnfollowAnotherUser(req.params.followed,req.params.follower)
            .then(status => res.send(status));


    /**
     * Retrieves all following of the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUserFollowing = (req: Request, res: Response)=>
        FollowController.followDao.findAllUserFollowing(req.params.uid)
            .then((follows : Follow [])=>res.json(follows));

    /**
     * Retrieves all follower of the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing user id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUserFollower= (req: Request, res: Response)=>
        FollowController.followDao.findAllUserFollower(req.params.uid)
            .then((follows : Follow [])=>res.json(follows));
}