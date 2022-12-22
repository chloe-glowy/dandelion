import { ContextContainerFactoryImpl } from 'src/server/context_container/private/ContextContainerFactoryImpl';

export interface IContextContainerFactory {
  create(): ContextContainer;
  assertConstructedByContextContainer(token: number): void;
}

export const ContextContainerFactory: IContextContainerFactory =
  ContextContainerFactoryImpl;

export interface CCPluginDispatcher<TPlugin> {
  create(cc: ContextContainer): TPlugin;
}

export class ContextModule {
  public constructor(proof: ProofOfBeingCalledByContextContainer) {
    proof;
  }
}

export class ProofOfBeingCalledByContextContainer {
  // For some reason, if we were to change the argument list from
  // `private token: number` to `token: number`, then the following code
  // is okay:
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

export type ContextModuleClass<T extends ContextModule> = new (
  token: ProofOfBeingCalledByContextContainer,
) => T;

export interface ContextContainer {
  setPlugin<TPlugin>(
    pluginDispatcher: CCPluginDispatcher<TPlugin>,
    pluginImplementation: TPlugin,
  ): void;
  getPlugin<TPlugin>(pluginDispatcher: CCPluginDispatcher<TPlugin>): TPlugin;
  get<TContextModule extends ContextModule>(
    contextModuleClass: ContextModuleClass<TContextModule>,
  ): TContextModule;
}

export type CC = ContextContainer;
