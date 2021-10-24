import express from 'express';
import { addPost, getPosts, updatePost, deletePost, incrementLikes, decrementLikes } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.put('/:id/likesInc', incrementLikes);
router.put('/:id/likesDec', decrementLikes);
router.put('/:id', updatePost)
router.post('/', addPost);
router.delete('/:id', deletePost)

export default router;