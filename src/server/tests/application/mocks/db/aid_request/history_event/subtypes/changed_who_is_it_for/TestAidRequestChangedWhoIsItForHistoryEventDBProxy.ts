import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestChangedWhoIsItForHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_who_is_it_for/AidRequestChangedWhoIsItForHistoryEventDBProxy';
import {
  TestAidRequestHistoryEventDBProxy,
  TestAidRequestHistoryEventDBProxySharedProperties,
} from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestChangedWhoIsItForHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestChangedWhoIsItForHistoryEventDBProxy
{
  constructor(
    cc: CC,
    sharedProperties: TestAidRequestHistoryEventDBProxySharedProperties,
    private readonly privateProperties: Readonly<{
      oldValue: string;
      newValue: string;
    }>,
  ) {
    super(cc, sharedProperties);
  }

  public async getOldValue(): Promise<string> {
    return this.privateProperties.oldValue;
  }

  public async getNewValue(): Promise<string> {
    return this.privateProperties.newValue;
  }
}
