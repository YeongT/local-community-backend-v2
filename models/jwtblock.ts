import { Model, model, Schema } from 'mongoose';
import currentTime from '../src/coms/currentTime';

interface JWTBlockObject {
  _id: Schema.Types.ObjectId;
  blockdate: string;
  blocktoken: string;
}

const JWTBlockSchema: Schema = new Schema(
  {
    blockdate: {
      type: String,
      default: currentTime(),
    },
    blocktoken: String,
  },
  {
    versionKey: false,
  },
);

const JWTBlockModel: Model<JWTBlockObject> = model<JWTBlockObject>('jwtBlock', JWTBlockSchema);
export { JWTBlockModel, JWTBlockObject };
