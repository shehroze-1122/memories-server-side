import mongoose from 'mongoose'
import postModel from '../models/postModel.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find()
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addPost = async (req, res) => {
  try {
    const post = req.body
    const newPost = new postModel({ ...post, creator: req.userId })
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params

    if (mongoose.Types.ObjectId.isValid(id)) {
      const post = await postModel.findById(id)
      if (!post) return res.status(404).send({ message: 'Post not found' })

      const userId = String(req.userId)
      const likes = new Set(post.likes)

      if (!likes.has(userId)) {
        likes.add(userId)
      } else {
        likes.delete(userId)
      }

      post.likes = [...likes]
      await post.save()

      res.status(200).json(post)
    } else {
      res.status(400).json('Bad Request')
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const postBody = req.body

  if (mongoose.Types.ObjectId.isValid(_id)) {
    const post = await postModel.findById(_id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    if (post.creator !== req.userId) return res.status(401).send({ message: 'Operation not permitted' })
    const updatedPost = await postModel.findByIdAndUpdate(_id, postBody, { new: true })
    res.status(200).json(updatedPost)
  } else {
    res.status(404).json('No user with this ID')
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (mongoose.Types.ObjectId.isValid(id)) {
    const post = await postModel.findById(id)
    if (!post) return res.status(404).send({ message: 'Post not found' })

    if (post.creator !== req.userId) return res.status(401).send({ message: 'Operation not permitted' })

    await postModel.deleteOne({ _id: id })

    res.status(200).send({ message: 'Deleted Successfully' })
  } else {
    res.status(400).send({ message: 'Invalid request' })
  }
}
