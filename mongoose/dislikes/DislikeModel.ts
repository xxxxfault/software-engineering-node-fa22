/**
 * @file Implements mongoose model to CRUD
 * documents in the dislikes collection
 */
import mongoose from "mongoose";
import DislikeSchema from "./DislikeSchema";
const DislikeModel = mongoose.model("DisikeModel", DislikeSchema);
export default DislikeModel;