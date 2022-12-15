import { initDBPlugins } from 'src/server/root/plugins/initDBPlugins';
import { initMentionsPlugin } from 'src/server/root/plugins/initMentionsPlugin';

export function initPlugins(): void {
  initMentionsPlugin();
  initDBPlugins();
}
