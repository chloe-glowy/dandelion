import {
  CCPluginDispatcher,
  ContextContainer,
  ContextModule,
  ContextModuleClass,
  ProofOfBeingCalledByContextContainer,
  TPluginImplementation,
} from 'src/server/context_container/public/ContextContainer';

export class ContextContainerImpl implements ContextContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plugins: Map<CCPluginDispatcher<any>, any> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private contextModules: Map<ContextModuleClass<any>, any> = new Map();

  public constructor(private sentinel: ProofOfBeingCalledByContextContainer) {}

  setPlugin<TPlugin extends TPluginImplementation>(
    pluginDispatcher: CCPluginDispatcher<TPlugin>,
    pluginImplementation: TPlugin,
  ): void {
    pluginDispatcher;
    pluginImplementation;
    throw new Error('Method not implemented.');
  }

  getPlugin<TPlugin extends TPluginImplementation>(
    pluginDispatcher: CCPluginDispatcher<TPlugin>,
  ): TPlugin {
    pluginDispatcher;
    throw new Error('Method not implemented.');
  }

  get<TContextModule extends ContextModule>(
    contextModuleClass: ContextModuleClass<TContextModule>,
  ): TContextModule {
    const contextModule = this.contextModules.get(contextModuleClass);
    if (contextModule != null) {
      return contextModule;
    }
    const newContextModule = new contextModuleClass(this.sentinel);
    this.contextModules.set(contextModuleClass, newContextModule);
    return newContextModule;
  }
}
