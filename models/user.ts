import { model, Schema } from 'mongoose';

const User: Schema = new Schema(
  {
    account: {
      email: String,
    },
    profile: {
      name: String,
      phone: String,
    },
    auth: {
      password: String,
      salt: String,
    },
  },
  {
    versionKey: false,
  },
);

export default model('user', User);
