import postModel from "../models/postModel.js";

export const getPosts= async (req, res)=>{
   try {
       const posts = await postModel.find();
       res.status(200).json(posts);
   } catch (error) {
       res.status(404).json({message:error.message});
   }
}

export const addPost = async (req, res)=>{
    try {
        const post = req.body;
        const newPost = new postModel(post);
        res.status(200).json(newPost);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}