// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { ObjectId } from 'mongodb';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import mongoose from 'mongoose';
import createHistoryEvent from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/createHistoryEvent';
import getHistoryUpdate from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getHistoryUpdate';
import getIsUndo from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/getIsUndo';
import updateAidRequest from 'src/server/adapters/graphql/aid_request_old/mutations/edit/helpers/updateAidRequest';
import type {
  GraphQLAidRequestUpdateArgs,
  GraphQLAidRequestUpdateResult,
} from 'src/server/adapters/graphql/aid_request_old/mutations/edit/UpdateType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { AidRequestReminderModel } from 'src/server/adapters/mongodb/collections/aid_request_reminder/AidRequestReminderModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import REMINDER_DAYS from 'src/server/adapters/mongodb/collections/aid_request_reminder/REMINDER_DAYS';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import afterRequestIsComplete from 'src/server/to_clean/afterRequestIsComplete';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import addDays from 'src/shared/to_clean/utils/date/addDays';

/**
 * @deprecated Use AidRequest class instead
 */
export default async function workingOn(
  args: GraphQLAidRequestUpdateArgs,
): Promise<GraphQLAidRequestUpdateResult> {
  const isAdd = args.input.action === 'Add';
  const isUndo = getIsUndo(args);
  const isWorkingOn = isAdd !== isUndo;
  await updateUserInfoObject(args, isWorkingOn);

  const historyEvent = createHistoryEvent(args, { supportsUndo: true });
  const historyUpdate = getHistoryUpdate(args, historyEvent);

  const userID = args.user._id;
  const whoIsWorkingOnItUpdate = isWorkingOn
    ? {
        $addToSet: {
          whoIsWorkingOnIt: userID,
        },
      }
    : {
        $pullAll: {
          whoIsWorkingOnIt: [userID],
        },
      };

  const aidRequest = await updateAidRequest(args.aidRequestID, {
    ...historyUpdate,
    ...whoIsWorkingOnItUpdate,
  });

  const postpublishSummary = isAdd
    ? "You're working on this"
    : "You're not working on this";

  afterRequestIsComplete({
    callback: () =>
      updateReminder({
        aidRequestID: new ObjectId(args.aidRequestID),
        isWorkingOn,
        userID,
      }),
    loggingTag: 'workingOn:updateReminder',
    req: args.req,
  });

  return { aidRequest, historyEvent, postpublishSummary };
}

async function updateUserInfoObject(
  args: GraphQLAidRequestUpdateArgs,
  isWorkingOn: boolean,
): Promise<void> {
  const aidRequestIDObj = new ObjectId(args.aidRequestID);
  await mongoose.connection.db.collection('userInfo').updateOne(
    { _id: new ObjectId(args.user._id) },
    isWorkingOn
      ? {
          $addToSet: {
            aidRequestsIAmWorkingOn: aidRequestIDObj,
          },
        }
      : {
          $pullAll: {
            aidRequestsIAmWorkingOn: [aidRequestIDObj],
          },
        },
  );
}

type UpdateReminderArgs = {
  isWorkingOn: boolean;
  aidRequestID: ObjectId;
  userID: ObjectId;
};

async function updateReminder({
  aidRequestID,
  isWorkingOn,
  userID,
}: UpdateReminderArgs): Promise<void> {
  const existingReminder = await AidRequestReminderModel.findOne({
    aidRequestID,
    userID,
  });
  if (isWorkingOn && existingReminder == null) {
    await new AidRequestReminderModel({
      aidRequestID,
      howManyDays: REMINDER_DAYS,
      scheduledFor: addDays(new Date(), REMINDER_DAYS),
      sent: false,
      userID,
    }).save();
  } else if (!isWorkingOn && existingReminder != null) {
    await AidRequestReminderModel.findByIdAndDelete(existingReminder._id);
  }
}
