import os
import re


def all_history_event_types():
    for dirpath, _dirnames, filenames in os.walk('src/server/entities/public/aid_request_history_event/subtypes/'):
        if len(filenames) == 0:
            continue
        for filename in filenames:
            match = re.match(r'AidRequest(\w+)HistoryEvent\.ts', filename)
            if match is None:
                continue
            event_type = match.groups()[0]
            event_type_snake_case = os.path.basename(dirpath)
            yield (event_type, event_type_snake_case)
