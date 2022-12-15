// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { composeWithMongoose } from 'graphql-compose-mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { Document } from 'mongoose';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbSharingGroupModel } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbSharingGroupType } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModelTypes';

export type MongodbSharingGroup = Document<
  unknown,
  unknown,
  MongodbSharingGroupType
> &
  MongodbSharingGroupType;

export const SharingGroupGraphQLType = composeWithMongoose<MongodbSharingGroup>(
  MongodbSharingGroupModel,
  {
    fields: {
      only: [
        // Fields must be explicitly defined with a resolver that
        // runs a privacy check. See AidRequestGraphQLImpl for a
        // list of fields.
      ],
    },
  },
);
