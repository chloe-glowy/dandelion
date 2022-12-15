import { ObjectId } from 'mongodb';

export type MongodbSharingGroupType = {
  _id: ObjectId;
  name: string;
};
