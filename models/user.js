import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Имя пользователя
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    match: /^[A-Z]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // Status
  status: {
    type: String,
    required: true,
  },
  // Granny
  granny: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  pics: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Image',
  }],
});

export default mongoose.model('User', UserSchema);
