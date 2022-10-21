import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: String,
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    date: {type: Date, default: Date.now},
}, {collection: "messages"});
export default MessageSchema;