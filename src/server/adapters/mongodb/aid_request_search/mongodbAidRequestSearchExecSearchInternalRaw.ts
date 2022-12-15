import { PipelineStage } from 'mongoose';
import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';

export async function mongodbAidRequestSearchExecSearchInternalRaw({
  filters,
  resultCount,
  skipCount,
}: {
  filters: ReadonlyArray<PipelineStage>;
  resultCount: number;
  skipCount: number;
}): Promise<QueryOutputType> {
  const stages: Array<PipelineStage> = [
    ...filters,
    {
      $sort: {
        lastUpdated: -1,
      },
    },
    {
      $facet: {
        data: [{ $skip: skipCount }, { $limit: resultCount }],
        metadata: [{ $count: 'total' }],
      },
    },
    {
      $project: {
        data: 1,
        total: { $arrayElemAt: ['$metadata.total', 0] },
      },
    },
  ];
  const [result] = await MongodbAidRequestModel.aggregate<{
    data: MongodbAidRequest[];
    total: number;
  }>(stages);
  return result;
}

type QueryOutputType = {
  data: MongodbAidRequest[];
  total: number;
};
