import { initMentionsPlugin } from 'src/server/root/plugins/initMentionsPlugin';
import { initTestDBPlugins } from 'src/server/tests/application/mocks/initTestDBPlugins';

export function initTestPlugins(): void {
  initMentionsPlugin();
  initTestDBPlugins();
}
