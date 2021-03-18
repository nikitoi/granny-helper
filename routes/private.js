import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.js';
import Image from '../models/image.js';

const upload = multer({
  dest: 'uploads/',
});

const router = express.Router();

router.get('/', authMiddleware, (req, res) => res.render('private'));

router.post('/photo', upload.single('photo'), (req, res, next) => {
  const image = req.file;
  // const { image } = req.body;
  console.log(1111111, image);

  res.json(image);
});

router.get('/details', authMiddleware, (req, res) => res.render('details'));

export default router;
