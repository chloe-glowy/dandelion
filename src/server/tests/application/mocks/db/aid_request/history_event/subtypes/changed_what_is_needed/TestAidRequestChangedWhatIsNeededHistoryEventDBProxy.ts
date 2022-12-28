import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestHistoryEvent } from 'src/server/entities/public/aid_request_history_event/AidRequestHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEvent } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEvent';
import { AidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededHistoryEventDBProxy';
import {
  TestAidRequestHistoryEventDBProxy,
  TestAidRequestHistoryEventDBProxySharedProperties,
} from 'src/server/tests/application/mocks/db/aid_request/history_event/TestAidRequestHistoryEventDBProxy';

export class TestAidRequestChangedWhatIsNeededHistoryEventDBProxy
  extends TestAidRequestHistoryEventDBProxy
  implements AidRequestChangedWhatIsNeededHistoryEventDBProxy
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

  asAidRequestHistoryEvent(cc: CC): AidRequestHistoryEvent {
    return new AidRequestChangedWhatIsNeededHistoryEvent(cc, this);
  }
}
