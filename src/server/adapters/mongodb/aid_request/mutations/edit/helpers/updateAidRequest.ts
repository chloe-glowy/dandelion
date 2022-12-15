import type { UpdateQuery } from 'mongoose';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import type { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequestEditImplReturnType } from 'src/server/adapters/mongodb/aid_request/mutations/edit/MongodbAidRequestEditImpl';

type Options = Readonly<{
  supportsUndo: boolean;
}>;

export default async function updateAidRequest(
  aidRequestID: string,
  updater: UpdateQuery<MongodbAidRequestRecord>,
  { supportsUndo }: Options,
): Promise<MongodbAidRequestEditImplReturnType> {
  const updatedAidRequest = await MongodbAidRequestModel.findByIdAndUpdate(
    aidRequestID,
    updater,
    {
      new: true,
    },
  );

  if (updatedAidRequest == null) {
    throw new Error('Update failed');
  }

  const historyEventIDForUndo = !supportsUndo
    ? undefined
    : (() => {
        const historyEventIDForUndo = updatedAidRequest.history
          .at(-1)
          ?._id?.toString();
        if (historyEventIDForUndo === undefined) {
          throw new Error('Failed to get historyEventIDForUndo');
        }
        return historyEventIDForUndo;
      })();

  return {
    historyEventIDForUndo,
    updatedAidRequest,
  };
}
