import { MentionsReplacerType } from 'src/server/entities/public/mentions/plugin/MentionsReplacerType';
import MentionPartType from 'src/shared/presenter_utils/mentions/MentionPartType';
import {
  getMentionValue,
  getValueFromParts,
  parseValue,
} from 'src/shared/presenter_utils/mentions/mention_utils';
import { Part } from 'src/shared/presenter_utils/mentions/types';

export class MentionsReplacerPlugin implements MentionsReplacerType {
  async updateStringWithMentionsUsingCurrentNames(
    originalString: string,
    getCurrentName: (id: string) => Promise<string>,
  ): Promise<string> {
    const { parts } = parseValue(originalString, [MentionPartType]);
    const updatedParts = await Promise.all(
      parts.map(async (part: Part): Promise<Part> => {
        const { data } = part;
        if (!data) {
          return part;
        }
        const { trigger, id } = data;
        const name = await getCurrentName(id);
        return {
          ...part,
          data: {
            ...data,
            name,
            original: getMentionValue(trigger, { id, name }),
          },
        };
      }),
    );
    return getValueFromParts(updatedParts);
  }
}
