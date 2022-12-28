import { ContextContainerImpl } from 'src/server/context_container/private/ContextContainerImpl';
import { ContextContainer } from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

const TOKEN = Math.random();

export const ContextContainerFactoryImpl = {
  assertConstructedByContextContainer(token: number): void {
    if (token !== TOKEN) {
      throw new Error('Attempted to construct ContextModuleClass directly');
    }
  },

  create(plugins: PluginCollection): ContextContainer {
    return new ContextContainerImpl(
      new ProofOfBeingCalledByContextContainer(TOKEN),
      plugins,
    );
  },
};

export class ProofOfBeingCalledByContextContainer {
  // If we were to change the argument list from
  // `private token: number` to `token: number`, then the following code
  // would pass TypeScript's type checker:
  // class Foo extends ContextModule {}
  // new Foo(1);
  // Because I guess Number has the same constructor signature as this class.
  // But if we make it a private member variable, then the compiler realizes
  // that the constructor signature is different, and it complains.

  // The whole point of this class is to make it impossible to construct
  // a ContextModule directly.
  public constructor(private token: number) {
    ContextContainerFactoryImpl.assertConstructedByContextContainer(this.token);
  }
}
