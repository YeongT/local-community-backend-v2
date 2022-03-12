import { model, Schema } from 'mongoose';
import currentTime from '../src/coms/currentTime';

const User: Schema = new Schema(
  {
    account: {
      email: String,
      status: {
        type: String,
        default: 'deactivated',
      },
      created: {
        type: String,
        default: currentTime,
      },
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
