from helpers.aid_request_history_event_types import all_history_event_types
from helpers.write_ts import write_ts

for event_type, event_type_snake_case in all_history_event_types():
    write_ts(
        'src/server/entities/public/aid_request_action/subtypes/{event_type_snake_case}/AidRequest{event_type}Action.ts'.format(
            event_type_snake_case=event_type_snake_case,
            event_type=event_type,
        ),
        """import {{ AidRequestAction }} from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export class AidRequest{event_type}Action extends AidRequestAction {{}}
      """.format(event_type=event_type)
    )
