import { CC } from 'src/server/context_container/public/ContextContainer';
import { AuthenticationPlugin } from 'src/server/entities/public/authentication/plugin/AuthenticationPlugin';
import { TestAuthenticationImpl } from 'src/server/tests/application/mocks/authn/TestAuthenticationImpl';

export function initTestAuthenticationPlugin(cc: CC): void {
  cc.setPlugin(AuthenticationPlugin, new TestAuthenticationImpl());
}
