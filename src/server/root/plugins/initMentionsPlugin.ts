import { MentionsReplacerPlugin } from 'src/server/adapters/mentions/MentionsReplacerPlugin';
import { MentionsReplacer } from 'src/server/entities/public/mentions/plugin/MentionsReplacer';

export function initMentionsPlugin(): void {
  MentionsReplacer.set(new MentionsReplacerPlugin());
}
