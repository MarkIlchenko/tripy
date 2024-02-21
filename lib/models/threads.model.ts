import mongoose from "mongoose";

const threadsSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    parentId: {
      type: String
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Threads'
      }
    ]
})

const Threads = mongoose.models.Threads || mongoose.model('Threads', threadsSchema);

export default Threads;