import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.js';
import Image from '../models/image.js';
import User from '../models/user.js';

const upload = multer({
  dest: 'public/uploads/',
});

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.session.user.id });
  let userPics = []
  for (let i = 0; i < user.pics.length; i++) {
    let currImg = await Image.findOne({ _id: user.pics[i]});
    currImg.path = currImg.path.slice(6);
    userPics.push(currImg);
  }
  // user.populate('pics');
  console.log(userPics);
  // const userPics = user.pics;
  res.render('private', { userPics });
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  const photo = req.file;
  // console.log(photo);
  const img = await new Image({
    filename: photo.filename,
    originalname: photo.originalname,
    path: photo.path,
  });
  await img.save();
  console.log(img);
  const user = await User.findOne({ _id: req.session.user.id });
  console.log(user);
  await user.pics.push(img);
  await user.save();
  res.redirect('/private');
});

router.get('/details', authMiddleware, (req, res) => res.render('details'));

export default router;
