import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creater: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: Number,
        default: 0
    },

    createdAt:{
        type: Date,
        default: new Date()
    }
})


const postModel = mongoose.model('postModel', postSchema);

export default postModel;