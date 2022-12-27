import { ObjectId } from 'mongodb';
import type { MongodbSharingGroupType } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModelTypes';
import nextTestID from 'src/server/to_clean/testing/nextTestID';

jest.mock(
  'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel',
  () => ({
    MongodbSharingGroupModel: {
      findById,
    },
  }),
);

const testSharingGroups: Map<string, MongodbSharingGroupType> = new Map();

export default function createTestAidRequest(
  sharingGroup_: Partial<MongodbSharingGroupType> = {},
): MongodbSharingGroupType {
  const sharingGroup = fillInDefaults(sharingGroup_);
  testSharingGroups.set(sharingGroup._id.toString(), sharingGroup);
  return sharingGroup;
}

function findById(id: string): MongodbSharingGroupType | undefined {
  return testSharingGroups.get(id.toString());
}

function fillInDefaults(
  sharingGroup: Partial<MongodbSharingGroupType>,
): MongodbSharingGroupType {
  return {
    _id: new ObjectId(nextTestID().toString()),
    name: nextName(),
    ...sharingGroup,
  };
}

let nameCount = 0;
function nextName(): string {
  nameCount++;
  return `Sharing Group ${nameCount}`;
}
