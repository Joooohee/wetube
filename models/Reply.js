import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
});

const model = mongoose.model("Reply", ReplySchema);
export default model;
