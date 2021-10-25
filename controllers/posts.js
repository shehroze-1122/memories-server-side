import mongoose from "mongoose";
import postModel from "../models/postModel.js";

export const getPosts= async (req, res)=>{

    try {
       const posts = await postModel.find({});
       res.status(200).json(posts);
   } catch (error) {
       res.status(404).json({message:error.message});
   }
}

export const addPost = async (req, res)=>{
    
    try {
        const post = req.body;
        const newPost = new postModel(post);
        await newPost.save();
        res.status(200).json(newPost);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const incrementLikes = async(req, res) =>{
    
    try{
        const { id } = req.params;

        if(mongoose.Types.ObjectId.isValid(id)){
            const post = await postModel.findById(id);
            const updatedPost = await postModel.findByIdAndUpdate(id, { likes: post.likes+1 }, { new: true});
            res.status(200).json(updatedPost);

        }else{
            res.status(400).json('Bad Request')
        }
    }

    catch(error){
    res.status(404).json({message: error.message})
    }

}

export const decrementLikes = async(req, res) =>{

    try{
        const { id } = req.params;

        if(mongoose.Types.ObjectId.isValid(id)){
            const post = await postModel.findById(id);
            const updatedPost = await postModel.findByIdAndUpdate(id, { likes: post.likes-1 }, { new: true});
            res.status(200).json(updatedPost);

        }else{
            res.status(400).json('Bad Request')
        }
    }

    catch(error){
    res.status(404).json({message: error.message})
    }

}

export const updatePost = async (req, res) =>{

    const { id: _id} = req.params;
    const post = req.body;

    if(mongoose.Types.ObjectId.isValid(_id)){
        const updatedPost = await postModel.findByIdAndUpdate(_id, post, { new: true})
        res.status(200).json(updatedPost);

    }else{
        res.status(404).json('No user with this ID');
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(mongoose.Types.ObjectId.isValid(id)){
        await postModel.findByIdAndDelete(id);
        res.status(200).send({message:'Deleted Successfully'})

    }else{
        res.status(404).send('Bad Request')
    }
}