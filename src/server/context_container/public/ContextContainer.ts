import {
  ContextContainerFactoryImpl,
  ProofOfBeingCalledByContextContainer,
} from 'src/server/context_container/private/ContextContainerFactoryImpl';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

export interface IContextContainerFactory {
  create(plugins: PluginCollection): ContextContainer;
}

export const ContextContainerFactory: IContextContainerFactory =
  ContextContainerFactoryImpl;

export interface PluginReference<TPlugin> {
  typeSpec(pluginType: TPlugin): never;
}

export function createPluginReference<T>(): PluginReference<T> {
  return {
    typeSpec(_pluginType: T): never {
      throw new Error('Do not call this function');
    },
  };
}

/**
 * A ContextualSingleton is a class that has at most one instance per ContextContainer.
 * The first time you call getSingleton on a ContextContainer, it will create an instance
 * of the class and store it in the ContextContainer. Subsequent calls to getSingleton
 * will return the same instance.
 *
 * Do not override the constructor of a ContextualSingleton. Instead, if you need to
 * initialize your singleton with some data, create an initialize method and
 * call it after calling cc.get(YourSingletonClass), like this:
 *
 * const singleton = cc.get(YourSingletonClass);
 * singleton.initialize(initializationParams);
 * ...
 * // Later, when you need to get data from the singleton:
 * const data = singleton.getData();
 *
 * getData() should throw an exception if initialize() has not been called.
 *
 * See RequestTIme.ts for an example.
 */
export class ContextualSingleton {
  public constructor(proof: ProofOfBeingCalledByContextContainer) {
    proof;
  }
}

export type SingletonClass<T extends ContextualSingleton> = new (
  token: ProofOfBeingCalledByContextContainer,
) => T;

export interface ContextContainer {
  getPlugin<TPlugin>(ref: PluginReference<TPlugin>): TPlugin;
  getSingleton<TSingleton extends ContextualSingleton>(
    singletonClass: SingletonClass<TSingleton>,
  ): TSingleton;
  memoize<T>(scope: unknown, key: string, fn: () => T): T;
}

export type CC = ContextContainer;
