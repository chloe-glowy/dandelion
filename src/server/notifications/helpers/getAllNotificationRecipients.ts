import type { MongodbAidRequest } from 'src/server/adapters/graphql/aid_request_old/AidRequestGraphQLTypes';
import getHistoryWithoutRemovals from 'src/server/adapters/mongodb/collections/aid_request/helpers/getHistoryWithoutRemovals';
import { viewerCanSeeUser } from 'src/server/adapters/mongodb/collections/user/loader/loadUserForViewer';
import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
import filterNulls from 'src/shared/language_utils/filterNulls';
import uniques from 'src/shared/to_clean/utils/uniques';

export default async function getAllNotificationRecipients({
  actor,
  aidRequest,
  extraRecipientIDs,
}: {
  actor: Express.User;
  aidRequest: MongodbAidRequest;
  extraRecipientIDs?: Array<string>;
}): Promise<Array<Express.User>> {
  const potentialRecipients = await getAllPotentialRecipients(
    aidRequest,
    extraRecipientIDs,
  );
  const recipients = potentialRecipients.filter((recipient) => {
    // Don't notify the actor about their own actions
    if (recipient._id.equals(actor._id)) {
      return false;
    }
    // Check whether the potential recipient (the person who would
    // be the "viewer" of the notification) can see the actor
    // (the person who would be the subject of the notification)
    return viewerCanSeeUser(recipient, actor);
  });
  return recipients;
}

async function getAllPotentialRecipients(
  aidRequest: MongodbAidRequest,
  extraRecipientIDs: undefined | Array<string>,
): Promise<Array<Express.User>> {
  const history = getHistoryWithoutRemovals(aidRequest);
  const userIDs = uniques(
    history
      .map(({ actor }) => actor.toString())
      .concat(extraRecipientIDs ?? []),
  );
  const users = await Promise.all(
    userIDs.map((userID: string) => UserModel.findById(userID)),
  );
  return filterNulls(users);
}
