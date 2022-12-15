import { ContextContainerImpl } from 'src/server/context_container/private/ContextContainerImpl';
import {
  ContextContainer,
  IContextContainerFactory,
  ProofOfBeingCalledByContextContainer,
} from 'src/server/context_container/public/ContextContainer';

const TOKEN = Math.random();

export const ContextContainerFactoryImpl: IContextContainerFactory = {
  assertConstructedByContextContainer(token: number): void {
    if (token !== TOKEN) {
      throw new Error('Attempted to construct ContextModuleClass directly');
    }
  },

  create(): ContextContainer {
    return new ContextContainerImpl(
      new ProofOfBeingCalledByContextContainer(TOKEN),
    );
  },
};
