import { Document } from 'mongoose';
import { MongodbAidRequestRecord } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModelTypes';

export type MongodbAidRequest = Document<
  unknown,
  unknown,
  MongodbAidRequestRecord
> &
  MongodbAidRequestRecord;
