import type { Document, UpdateQuery } from 'mongoose';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import type { Options } from 'src/server/scripts/helpers/script-update-options';
import { updateObjectForScript } from 'src/server/scripts/helpers/update-object';

export async function updateAidRequestForScript(
  aidRequest: Document<MongodbAidRequestRecord>,
  updates: UpdateQuery<MongodbAidRequestRecord>,
  { isDryRun, logOnChange }: Options,
): Promise<Document<MongodbAidRequestRecord> | null> {
  return await updateObjectForScript<MongodbAidRequestRecord>(
    aidRequest,
    updates,
    {
      isDryRun,
      logOnChange,
      model: MongodbAidRequestModel,
      objectTypeName: 'Aid Request',
    },
  );
}
