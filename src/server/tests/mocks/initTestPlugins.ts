import { initMentionsPlugin } from 'src/server/root/plugins/initMentionsPlugin';
import { initTestDBPlugins } from 'src/server/tests/mocks/initTestDBPlugins';

export function initTestPlugins(): void {
  initMentionsPlugin();
  initTestDBPlugins();
}
