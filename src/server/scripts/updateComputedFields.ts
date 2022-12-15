import type { Document } from 'mongoose';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import getComputedFields from 'src/server/adapters/mongodb/collections/aid_request/computed_fields/getComputedFields';
import { updateAidRequestForScript } from 'src/server/scripts/helpers/update-aid-request';

type Options = {
  logOnChange: boolean;
  isDryRun: boolean;
};

export async function updateComputedFields(
  aidRequest: MongodbAidRequest,
  { logOnChange, isDryRun }: Options,
): Promise<MongodbAidRequest | null> {
  const computedFields = await getComputedFields(aidRequest);
  return (await updateAidRequestForScript(
    aidRequest as unknown as Document<MongodbAidRequestRecord>,
    computedFields,
    {
      isDryRun,
      logOnChange,
    },
  )) as unknown as MongodbAidRequest | null;
}
