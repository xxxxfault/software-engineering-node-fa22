/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import mongoose from "mongoose";
import MessageController from "./controllers/MessageController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import AuthenticationController from "./controllers/auth-controller";
import DislikeController from "./controllers/DislikeController";
const app = express();
const cors = require('cors');
const session = require("express-session");


const corsOptions ={
    origin:true,
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());

// build the connection string
const url=`mongodb+srv://jiaqian:${process.env.mongodbpw}@cluster0.ucuihp7.mongodb.net/tuiter?retryWrites=true&w=majority`;

mongoose.connect(url)
// mongoose.connect('mongodb://localhost:27017/tuiter');



let sess = {
    secret: process.env.SESSION_SECRET || 'Super Secret (change it)',
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: true,
        resave: true,
        sameSite: 'none'
    }
}

app.set('trust proxy', 1) // trust first proxy


app.use(session(sess))


app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));



// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
const messageController = MessageController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);



