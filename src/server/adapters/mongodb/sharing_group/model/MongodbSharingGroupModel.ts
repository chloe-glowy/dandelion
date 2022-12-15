import { model, Schema } from 'mongoose';
import { MongodbSharingGroupType } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModelTypes';

const MongodbSharingGroupSchema = new Schema<MongodbSharingGroupType>({
  name: String,
});

export const MongodbSharingGroupModel = model<MongodbSharingGroupType>(
  'SharingGroup',
  MongodbSharingGroupSchema,
);

export const MongodbSharingGroupDeletedModel = model<MongodbSharingGroupType>(
  'SharingGroupDeleted',
  MongodbSharingGroupSchema,
);
