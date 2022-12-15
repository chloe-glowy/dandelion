import { DecodeReducerArgs } from 'src/client/aid_request/filter/FilterSettingType';
import { FILTERS } from 'src/client/aid_request/filter/RequestExplorerFilters';
import {
  DEFAULT_FILTER,
  FilterType,
} from 'src/client/aid_request/filter/RequestExplorerFiltersStore';

export function decode(encoded: string | undefined): FilterType {
  let args: DecodeReducerArgs = {
    encoded: encoded || '',
    filter: DEFAULT_FILTER,
  };
  FILTERS.forEach(({ decode }) => {
    args = decode(args);
  });
  if (args.encoded) {
    throw new Error('Failed to process encoded filter: ' + encoded);
  }
  return args.filter;
}

export function encode(filter: FilterType): string | undefined {
  const val = FILTERS.map(({ encode }) => encode(filter)).join('');
  return val || undefined;
}
