import { maybeLoadUserForViewer } from 'src/server/adapters/mongodb/collections/user/loader/loadUserForViewer';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import MentionPartType from 'src/shared/presenter_utils/mentions/MentionPartType';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import {
  getMentionValue,
  getValueFromParts,
  parseValue,
} from 'src/shared/presenter_utils/mentions/mention_utils';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { Part } from 'src/shared/presenter_utils/mentions/types';

export default async function updateMentions(
  viewer: Express.User,
  message: string,
): Promise<string> {
  const { parts } = parseValue(message, [MentionPartType]);
  const updatedParts = await Promise.all(
    parts.map(async (part: Part): Promise<Part> => {
      const { data } = part;
      if (!data) {
        return part;
      }
      const { trigger, id } = data;
      const name = await getNameForId(viewer, id);
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

async function getNameForId(viewer: Express.User, id: string): Promise<string> {
  const user = await maybeLoadUserForViewer(viewer, id);
  return user?.displayName ?? 'Unknown';
}
