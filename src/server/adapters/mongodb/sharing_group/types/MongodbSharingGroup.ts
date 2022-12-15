import { Document } from 'mongoose';
import { MongodbSharingGroupType } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModelTypes';

export type MongodbSharingGroup = Document<
  unknown,
  unknown,
  MongodbSharingGroupType
> &
  MongodbSharingGroupType;
