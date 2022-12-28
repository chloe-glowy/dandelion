import { createPluginReference } from 'src/server/context_container/public/ContextContainer';
import { MentionsReplacerType } from 'src/server/entities/public/mentions/plugin/MentionsReplacerType';

export const MentionsReplacerPlugin =
  createPluginReference<MentionsReplacerType>();
