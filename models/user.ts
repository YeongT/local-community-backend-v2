import { Model, model, Schema } from 'mongoose';
import currentTime from '../src/coms/currentTime';

interface UserObject {
  _id: Schema.Types.ObjectId;
  account: {
    email: string;
    status: ['deactivated' | 'activated' | 'closed'];
    created: string;
  };
  profile: {
    name: string;
    phone: string;
  };
  auth: {
    password: string;
    salt: string;
  };
}

const UserSchema: Schema = new Schema(
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
const UserModel: Model<UserObject> = model<UserObject>('user', UserSchema);
export { UserModel, UserObject };
