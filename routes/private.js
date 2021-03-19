import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.js';
import Image from '../models/image.js';
import User from '../models/user.js';

import say from 'say';

// import Tesseract from 'tesseract.js';

import { createWorker } from 'tesseract.js';

const worker = createWorker({
  logger: (data) => console.log(data)
});

const upload = multer({
  dest: 'public/uploads/',
});

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.session.user.id });
  if (req.session.user.status === 'Бабушка') {
    let userPics = [];
    for (let i = 0; i < user.pics.length; i++) {
      let currImg = await Image.findOne({ _id: user.pics[i]});
      currImg.path = currImg.path.slice(6);
      userPics.push(currImg);
    }
    res.render('private', { userPics });
  } else {
    const granny = await User.findOne({ _id: user.granny});
    let userPics = [];
    for (let i = 0; i < granny.pics.length; i++) {
      let currImg = await Image.findOne({ _id: granny.pics[i]});
      currImg.path = currImg.path.slice(6);
      userPics.push(currImg);
    }
    res.render('grandchild', { userPics });
  }
});

router.post('/', upload.single('photo'), async (req, res, next) => {
  console.log('simple');
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

router.post('/:id', async (req, res, next) => {
  console.log('iddd');
  const picId = req.params.id;
  const { lng } = req.body;
  const dirr = __dirname.slice(0, -6);
  const url = (dirr + `public/uploads/${picId}`).slice(0, -1);
  const img = fs.readFileSync(url, {
    encoding: null
  });

  async function recognize() {
    const file = img;
    const lang = lng;
    await worker.load();
    await worker.loadLanguage(lang);
    await worker.initialize(lang);
    const { data: { text } } = await worker.recognize(file);
    console.log(text);
    await worker.terminate();
    return text;
  }

  res.json(await recognize());
});

// router.post('/:filename', async (req, res, next) => {
//   const picFilename = req.params.filename;

// })

router.delete('/delete/img', async (req, res, next) => {
  const { imgFilename } = req.body;
  const picToDelete = await Image.findOne({filename: imgFilename});
  const user = await User.findOne({ _id: req.session.user.id });
  const ind = user.pics.indexOf(picToDelete._id);
  user.pics.splice(ind, 1);
  await user.save();
  // console.log(picToDelete);
  await Image.deleteOne(picToDelete);
  res.json('ok');
});


router.get('/details', authMiddleware, (req, res) => res.render('details'));

export default router;
