// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
import type { CreateAidRequestsPayloadType } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import { CreateAidRequestsPayloadGraphQLType } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { MongodbAidRequestHistoryEvent } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import getComputedFields from 'src/server/adapters/mongodb/collections/aid_request/computed_fields/getComputedFields';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import analytics from 'src/server/deprecated/analytics';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { VC } from 'src/server/entities/private/vc/ViewerContext';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { ViewerPublic } from 'src/server/entities/public/viewer/ViewerPublic';
import flatten from 'src/shared/language_utils/flatten';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import resolveWhoIsItFor from 'src/shared/to_clean/utils/resolveWhoIsItFor';

async function createAidRequestsResolver(
  _: unknown,
  {
    sharingGroupID,
    whatIsNeeded: whatAllIsNeeded,
    whoIsItFor: whoIsItForSingle,
    whoIsItForMulti,
  }: {
    sharingGroupID: string;
    whatIsNeeded: string[];
    whoIsItFor?: string;
    whoIsItForMulti?: string[];
  },
  req: Express.Request,
): Promise<CreateAidRequestsPayloadType> {
  // TODO -- What is the best way for the GraphQL layer to conveniently
  // assert that the user is logged in?
  ViewerPublic.assertLoggedIn(req.cc, 'createAidRequests');
  const { user } = req.cc.getSingleton(VC).vc;
  if (user == null) {
    throw new Error('Expected user to be non-null');
  }
  const userSharingGroupIDs = await user.getSharingGroupIDs();
  if (!userSharingGroupIDs.includes(sharingGroupID)) {
    throw new Error(
      "You don't have permission to create a request for this sharing group",
    );
  }
  const sharingGroup = await SharingGroup.load(req.cc, sharingGroupID);
  if (sharingGroup == null) {
    throw new Error('Sharing group not found');
  }
  const sharingGroupDisplayName = await sharingGroup.getDisplayName();
  const whoIsItFor = resolveWhoIsItFor({
    whoIsItForMulti,
    whoIsItForSingle,
  });
  const userID = await user.getID();
  const whoRecordedIt = new ObjectId(userID);
  const timestamp = new Date();
  const creationEvent: Omit<MongodbAidRequestHistoryEvent, '_id'> = {
    action: 'Add',
    actor: new ObjectId(userID),
    event: 'Created',
    timestamp,
  };
  const aidRequests = flatten(
    whoIsItFor.map((whoIsItFor: string) =>
      whatAllIsNeeded.map(async (whatIsNeeded: string) => {
        const manualFields = {
          completed: false,
          createdAt: new Date(),
          history: [creationEvent],
          sharingGroup: new ObjectId(sharingGroupID),
          whatIsNeeded,
          whoIsItFor,
          whoIsWorkingOnIt: [],
          whoRecordedIt,
        };
        const computedFields = await getComputedFields(manualFields);
        const fields = { ...manualFields, ...computedFields };
        return new MongodbAidRequestModel(fields);
      }),
    ),
  );
  const savedRequests = await Promise.all(
    aidRequests.map(async (aidRequestPromise) => {
      const aidRequest = await aidRequestPromise;
      return await aidRequest.save();
    }),
  );
  savedRequests.forEach((aidRequest) => {
    analytics.track({
      event: 'Created Aid Request',
      properties: {
        aidRequestID: aidRequest._id,
        sharingGroupID: sharingGroupID.toString(),
        whatIsNeeded: aidRequest.whatIsNeeded,
        whoIsItFor: aidRequest.whoIsItFor,
      },
      user: req.user ?? null,
    });
  });
  return {
    postpublishSummary: `Recorded ${summarizeList(
      whatAllIsNeeded,
      'requests',
    )} for ${summarizeList(whoIsItFor, 'people')}${
      userSharingGroupIDs.length > 1 ? ` (${sharingGroupDisplayName})` : ''
    }`,
    requests: savedRequests,
  };
}

const createAidRequests = {
  args: {
    sharingGroupID: 'String!',
    whatIsNeeded: '[String!]!',
    whoIsItFor: 'String',
    whoIsItForMulti: '[String]',
  },
  resolve: createAidRequestsResolver,
  type: CreateAidRequestsPayloadGraphQLType,
};

function summarizeList(list: string[], elemNounPlural: string): string {
  if (list.length === 1) {
    return list[0];
  } else {
    return `${list.length} ${elemNounPlural}`;
  }
}

export default createAidRequests;
