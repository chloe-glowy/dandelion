import filterNulls from 'src/shared/language_utils/filterNulls';
import MentionPartType from 'src/shared/presenter_utils/mentions/MentionPartType';
import { parseValue } from 'src/shared/presenter_utils/mentions/mention_utils';
import type { Part } from 'src/shared/presenter_utils/mentions/types';
import uniques from 'src/shared/to_clean/utils/uniques';

export default function getTaggedIDs(message: string): Array<string> {
  const { parts } = parseValue(message, [MentionPartType]);
  return uniques(
    filterNulls(parts.map((part: Part): string | undefined => part.data?.id)),
  );
}
