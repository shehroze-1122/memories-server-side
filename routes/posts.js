import express from 'express';
import { addPost, getPosts, updatePost, deletePost, incrementLikes, decrementLikes } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/likesInc', incrementLikes)
router.put('/likesDec', decrementLikes)

export default router;