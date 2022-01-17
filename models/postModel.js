import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: [String],
        default: []
    },

    createdAt:{
        type: Date,
        default: Date
    }
})


const postModel = mongoose.model('postmodels', postSchema);

export default postModel;