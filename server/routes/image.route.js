import express from 'express'
import  generateImage from '../controllers/image.controller.js';
import userAuth from '../middlewares/auth.middleware.js'
import multer from 'multer';

const imageRouter = express.Router()

const upload = multer({ storage: multer.memoryStorage() });

imageRouter.post('/generate-image', userAuth, generateImage)

export default imageRouter


