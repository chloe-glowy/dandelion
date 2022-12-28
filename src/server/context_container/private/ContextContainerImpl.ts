import { ProofOfBeingCalledByContextContainer } from 'src/server/context_container/private/ContextContainerFactoryImpl';
import {
  ContextContainer,
  ContextualSingleton,
  PluginReference,
  SingletonClass,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

export class ContextContainerImpl implements ContextContainer {
  private singletons: Map<
    SingletonClass<ContextualSingleton>,
    ContextualSingleton
  > = new Map();

  private memoizationCache: Map<unknown, Map<string, unknown>> = new Map();

  public constructor(
    private readonly sentinel: ProofOfBeingCalledByContextContainer,
    private readonly plugins: PluginCollection,
  ) {}

  public getPlugin<TPlugin>(ref: PluginReference<TPlugin>): TPlugin {
    return this.plugins.get(ref);
  }

  public getSingleton<TSingleton extends ContextualSingleton>(
    singletonClass: SingletonClass<TSingleton>,
  ): TSingleton {
    const singleton = this.singletons.get(singletonClass);
    if (singleton != null) {
      return singleton as TSingleton;
    }
    const newSingleton = new singletonClass(this.sentinel);
    this.singletons.set(singletonClass, newSingleton);
    return newSingleton;
  }

  public memoize<T>(scope: unknown, key: string, fn: () => T): T {
    const scopeCache = this.getMemoizationScopeCache<T>(scope);
    const cachedValue = scopeCache.get(key);
    if (cachedValue != null) {
      return cachedValue as T;
    }
    const newValue = fn();
    scopeCache.set(key, newValue);
    return newValue;
  }

  private getMemoizationScopeCache<T>(scope: unknown): Map<string, T> {
    const existing = this.memoizationCache.get(scope);
    if (existing != null) {
      return existing as Map<string, T>;
    }
    const newMap = new Map<string, T>();
    this.memoizationCache.set(scope, newMap);
    return newMap;
  }
}
