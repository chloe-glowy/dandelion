import {
  CC,
  CCPluginDispatcher,
} from 'src/server/context_container/public/ContextContainer';
import { MentionsReplacerType } from 'src/server/entities/public/mentions/plugin/MentionsReplacerType';

export const MentionsReplacerPlugin: CCPluginDispatcher<MentionsReplacerType> =
  {
    getImpl(cc: CC): MentionsReplacerType {
      return cc.getPlugin(MentionsReplacerPlugin);
    },
  };
