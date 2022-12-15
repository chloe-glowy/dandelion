import { MentionsReplacerType } from 'src/server/entities/public/mentions/plugin/MentionsReplacerType';

let PLUGIN: MentionsReplacerType | undefined;

export const MentionsReplacer = {
  get(): MentionsReplacerType {
    if (PLUGIN == null) {
      throw new Error('MentionsReplacer plugin not set');
    }
    return PLUGIN;
  },
  set(plugin: MentionsReplacerType): void {
    PLUGIN = plugin;
  },
};
