import { CC } from 'src/server/context_container/public/ContextContainer';
import { RequestTime } from 'src/server/context_container/public/RequestTime';
import { User } from 'src/server/entities/public/user/User';
import { TestAidRequestDBProxy } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestDBProxy';
import { TestAidRequestInMemoryDatabaseRow } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestInMemoryDatabaseRow';

export class TestAidRequestEditExecutorContext {
  public static async create(
    cc: CC,
    aidRequestDBProxy: TestAidRequestDBProxy,
    actor: User,
    row: TestAidRequestInMemoryDatabaseRow,
  ): Promise<TestAidRequestEditExecutorContext> {
    const actorId = await actor.getID();
    const aidRequestID = row.properties.id;
    return new TestAidRequestEditExecutorContext(
      cc,
      aidRequestDBProxy,
      actorId,
      RequestTime.get(cc),
      aidRequestID,
      row,
    );
  }

  private constructor(
    public readonly cc: CC,
    public readonly aidRequestDBProxy: TestAidRequestDBProxy,
    public readonly actor: string,
    public readonly timestamp: Date,
    public readonly aidRequestID: string,
    public readonly row: TestAidRequestInMemoryDatabaseRow,
  ) {}
}
