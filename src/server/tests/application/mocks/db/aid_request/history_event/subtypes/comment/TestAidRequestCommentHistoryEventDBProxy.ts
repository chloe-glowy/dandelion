import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestCommentHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/comment/AidRequestCommentHistoryEventDBProxy';
import {
  TestAidRequestHistoryEventDBProxy,
  TestAidRequestHistoryEventDBProxySharedProperties,
} from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestCommentHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestCommentHistoryEventDBProxy
{
  constructor(
    cc: CC,
    sharedProperties: TestAidRequestHistoryEventDBProxySharedProperties,
    private readonly privateProperties: Readonly<{
      rawCommentContents: string;
    }>,
  ) {
    super(cc, sharedProperties);
  }

  public async getRawCommentContents(): Promise<string> {
    return this.privateProperties.rawCommentContents;
  }
}
