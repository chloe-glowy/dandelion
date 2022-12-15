import { MongodbAidRequestDeletedModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';

export default async function aidRequestHasBeenDeleted(
  aidRequestID: string,
): Promise<boolean> {
  const maybeDeletedObject = await MongodbAidRequestDeletedModel.findById(
    aidRequestID,
  );
  return maybeDeletedObject != null;
}
