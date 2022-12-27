import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import createTestSharingGroup from 'src/server/to_clean/testing/createTestSharingGroup';
import nextTestID from 'src/server/to_clean/testing/nextTestID';

jest.mock(
  'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel',
  () => ({
    MongodbAidRequestModel: {
      findById,
    },
  }),
);

const testAidRequests: Map<string, MongodbAidRequestRecord> = new Map();

export default function createTestAidRequest(
  aidRequest_: Partial<MongodbAidRequestRecord> &
    Pick<MongodbAidRequestRecord, 'whoRecordedIt'>,
): MongodbAidRequestRecord {
  const aidRequest = fillInDefaults(aidRequest_);
  testAidRequests.set(aidRequest._id.toString(), aidRequest);
  return aidRequest;
}

function findById(id: string): MongodbAidRequestRecord | undefined {
  return testAidRequests.get(id.toString());
}

function fillInDefaults(
  aidRequest: Partial<MongodbAidRequestRecord> &
    Pick<MongodbAidRequestRecord, 'whoRecordedIt'>,
): MongodbAidRequestRecord {
  return {
    _id: nextTestID().toString(),
    completed: false,
    createdAt: new Date(),
    crew: 'Test Crew 1',
    history: [
      {
        action: 'Add',
        actor: aidRequest.whoRecordedIt,
        event: 'Created',
        timestamp: new Date(),
      },
    ],
    lastUpdated: new Date(),
    sharingGroup: createTestSharingGroup()._id,
    whatIsNeeded: 'What is Needed',
    whatIsNeededSearch: 'What is Needed',
    whoIsItFor: 'Who is it For',
    whoIsItForSearch: 'Who is it For',
    whoIsWorkingOnIt: [],
    whoIsWorkingOnItSearch: '',
    whoRecordedItSearch: '',
    whoRecordedItUsername: '',
    ...aidRequest,
  };
}
