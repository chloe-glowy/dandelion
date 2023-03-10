import { CC } from 'src/server/context_container/public/ContextContainer';
import { MentionsReplacer } from 'src/server/entities/public/mentions/plugin/MentionsReplacer';
import { User } from 'src/server/entities/public/user/User';

export abstract class UpdateUserSubmittedTextWithMentionsContentsOnRead {
  public static async exec(cc: CC, userSubmittedText: string): Promise<string> {
    return await MentionsReplacer.get().updateStringWithMentionsUsingCurrentNames(
      userSubmittedText,
      getCurrentName,
    );

    async function getCurrentName(id: string): Promise<string> {
      const user = await User.load(cc, id);
      const displayName = await user?.getDisplayName();
      return displayName ?? 'Unknown';
    }
  }
}
