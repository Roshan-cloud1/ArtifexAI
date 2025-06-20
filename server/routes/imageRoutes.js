import express from 'express';
import authUser from '../middlewares/auth.js';  // Fixed spelling: middlewares
import { generateImage } from '../controllers/imageController.js';  // Added .js extension

const imageRouter = express.Router();

imageRouter.post('/generate-image', authUser, generateImage);

export default imageRouter;