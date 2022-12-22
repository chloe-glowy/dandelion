import { CC } from 'src/server/context_container/public/ContextContainer';
import { initMentionsPlugin } from 'src/server/root/plugins/initMentionsPlugin';
import { initTestAuthenticationPlugin } from 'src/server/tests/application/mocks/plugins/initTestAuthenticationPlugin';
import { initTestDBPlugins } from 'src/server/tests/application/mocks/plugins/initTestDBPlugins';

export function initTestPlugins(cc: CC): void {
  initMentionsPlugin();
  initTestDBPlugins();
  initTestAuthenticationPlugin(cc);
}
