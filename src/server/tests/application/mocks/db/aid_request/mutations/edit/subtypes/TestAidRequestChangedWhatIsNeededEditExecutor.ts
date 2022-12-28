import { AidRequestChangedWhatIsNeededAction } from 'src/server/entities/public/aid_request_action/subtypes/changed_what_is_needed/AidRequestChangedWhatIsNeededAction';
import { AidRequestHistoryEventDBProxy } from 'src/server/entities/public/aid_request_history_event/plugins/interfaces/AidRequestHistoryEventDBProxy';
import { TestAidRequestChangedWhatIsNeededHistoryEventDBProxy } from 'src/server/tests/application/mocks/db/aid_request/history_event/subtypes/changed_what_is_needed/TestAidRequestChangedWhatIsNeededHistoryEventDBProxy';
import { TestAidRequestEditExecutorContext } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditExecutorContext';
import { TestAidRequestEditImplReturnType } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImpl';
import { TestAidRequestEditImplExecutor } from 'src/server/tests/application/mocks/db/aid_request/mutations/edit/TestAidRequestEditImplExecutor';
import { TestID } from 'src/server/tests/application/mocks/TestID';

export class TestAidRequestChangedWhatIsNeededEditExecutor extends TestAidRequestEditImplExecutor {
  public constructor(
    protected readonly context: TestAidRequestEditExecutorContext,
    protected readonly action: AidRequestChangedWhatIsNeededAction,
  ) {
    super();
  }

  public async exec(): Promise<TestAidRequestEditImplReturnType> {
    const { oldValue, newValue } = this.action;

    if (this.context.row.properties.whatIsNeeded !== oldValue) {
      throw new Error('oldValue is incorrect');
    }

    const historyEventID = TestID.create('aid_request_history_event');

    const historyEvent: AidRequestHistoryEventDBProxy =
      new TestAidRequestChangedWhatIsNeededHistoryEventDBProxy(
        this.context.cc,
        {
          actorID: this.context.actor,
          id: historyEventID,
          timestamp: this.context.timestamp,
        },
        {
          newValue,
          oldValue,
        },
      );

    this.context.row.properties.history.push(historyEvent);
    this.context.row.properties.whatIsNeeded = newValue;

    return {
      historyEventIDForUndo: historyEventID,
    };
  }
}
