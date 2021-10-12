import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: Number,
        default: 0
    },

    createdAt:{
        type: Date,
        default: Date
    }
})


const postModel = mongoose.model('postmodels', postSchema);

export default postModel;