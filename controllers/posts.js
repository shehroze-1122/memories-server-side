import mongoose from "mongoose";
import postModel from "../models/postModel.js";

export const getPosts= async (req, res)=>{
   console.log('route hit')
    try {
        console.log('hiiii')
       const posts = await postModel.find({});
       console.log('hellooo')
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
        const post = req.body;
        console.log('Title', post.title)
        if(post){
            await postModel.updateOne(
                {...post},
                {
                $inc:{
                    likes:1
                }
            })
            await postModel.save()
            res.status(200).json('Success');
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
        const post = req.body;
        console.log('Likes before', post.likes)

        if(post){
            console.log("IN DECREMENT")
            await postModel.updateOne(
                {...post},
                {
                $inc:{
                    likes: -1
                }
            })
            await postModel.save()
            res.status(200).json('Success');
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
    console.log('delete routee hit', id)
    if(mongoose.Types.ObjectId.isValid(id)){
        await postModel.findByIdAndDelete(id);
        res.status(200).send({message:'Deleted Successfully'})
    }else{
        res.status(404).send('Bad Request')
    }
}