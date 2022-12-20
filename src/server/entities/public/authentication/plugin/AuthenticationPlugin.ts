import {
  CC,
  CCPluginDispatcher,
} from 'src/server/context_container/public/ContextContainer';
import { AuthenticationType } from 'src/server/entities/public/authentication/Authentication';

export const AuthenticationPlugin: CCPluginDispatcher<AuthenticationType> = {
  create: (cc: CC): AuthenticationType => {
    return cc.getPlugin(AuthenticationPlugin);
  },
};
