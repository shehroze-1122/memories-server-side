import express from 'express'
import { addPost, getPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'

import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/', getPosts)
router.put('/:id/likePost', auth, likePost)
router.put('/:id', auth, updatePost)
router.post('/', auth, addPost)
router.delete('/:id', auth, deletePost)

export default router
