import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new Schema({
  courseid: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
