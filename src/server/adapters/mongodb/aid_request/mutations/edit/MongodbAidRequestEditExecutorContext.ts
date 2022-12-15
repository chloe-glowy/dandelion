import { ObjectId } from 'mongodb';
import { MongodbAidRequestDBProxy } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBProxy';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { RequestTime } from 'src/server/context_container/public/RequestTime';
import { User } from 'src/server/entities/public/user/User';

export class MongodbAidRequestEditExecutorContext {
  public static async create(
    cc: CC,
    aidRequestDBProxy: MongodbAidRequestDBProxy,
    actor: User,
    currentMongodbAidRequest: MongodbAidRequest,
  ): Promise<MongodbAidRequestEditExecutorContext> {
    const actorId = new ObjectId(await actor.getID());
    const aidRequestID = currentMongodbAidRequest._id.toString();
    return new MongodbAidRequestEditExecutorContext(
      cc,
      aidRequestDBProxy,
      actorId,
      RequestTime.get(cc),
      aidRequestID,
    );
  }

  private constructor(
    public readonly cc: CC,
    public readonly aidRequestDBProxy: MongodbAidRequestDBProxy,
    public readonly actor: ObjectId,
    public readonly timestamp: Date,
    public readonly aidRequestID: string,
  ) {}
}
