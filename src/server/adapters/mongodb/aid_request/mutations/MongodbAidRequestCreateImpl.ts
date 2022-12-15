import { ObjectId } from 'mongodb';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import {
  MongodbAidRequestComputedFields,
  MongodbAidRequestComputedFieldsManualFields,
} from 'src/server/adapters/mongodb/aid_request/mutations/MongodbAidRequestComputedFields';
import { MongodbAidRequestHistoryEventObjectConverter } from 'src/server/adapters/mongodb/aid_request_history_event/history_event_object_converter/MongodbAidRequestHistoryEventObjectConverter';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';

export class MongodbAidRequestCreateImpl {
  public static async execute(
    cc: CC,
    args: AidRequestCreateArgs,
  ): Promise<AidRequest> {
    const manualFields = await MongodbAidRequestCreateImpl.getManualFields(
      cc,
      args,
    );
    const computedFields = await MongodbAidRequestComputedFields.compute(
      manualFields,
    );
    const fields = {
      ...manualFields,
      ...computedFields,
    };

    const model = new MongodbAidRequestModel(fields);
    const saved = await model.save();

    const id = saved._id.toString();
    const aidRequest = await AidRequest.load(cc, id);

    if (aidRequest == null) {
      throw new Error('AidRequest not found');
    }
    return aidRequest;
  }

  private static async getManualFields(
    cc: CC,
    {
      completed,
      createdAt,
      history: historyObjects,
      sharingGroup: sharingGroupObject,
      whatIsNeeded,
      whoIsItFor,
      whoIsWorkingOnIt: whoIsWorkingOnItUsers,
      whoRecordedIt: whoRecordedItObject,
    }: AidRequestCreateArgs,
  ): Promise<MongodbAidRequestComputedFieldsManualFields> {
    const sharingGroupIDString = await sharingGroupObject.getID();
    const sharingGroupID = new ObjectId(sharingGroupIDString);

    const whoIsWorkingOnIt = await Promise.all(
      whoIsWorkingOnItUsers.map(async (user) => {
        const id = await user.getID();
        return new ObjectId(id);
      }),
    );

    const history = await Promise.all(
      historyObjects.map(async (historyObject) => {
        return await MongodbAidRequestHistoryEventObjectConverter.create(
          cc,
          historyObject,
          whoRecordedItObject,
        );
      }),
    );

    const whoRecordedItIDString = await whoRecordedItObject.getID();
    const whoRecordedItID = new ObjectId(whoRecordedItIDString);

    const manualFields = {
      completed,
      createdAt,
      history,
      sharingGroup: sharingGroupID,
      whatIsNeeded,
      whoIsItFor,
      whoIsWorkingOnIt,
      whoRecordedIt: whoRecordedItID,
    };

    return manualFields;
  }
}
