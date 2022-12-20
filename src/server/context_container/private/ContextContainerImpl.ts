import {
  CCPluginDispatcher,
  ContextContainer,
  ContextModule,
  ContextModuleClass,
  ProofOfBeingCalledByContextContainer,
} from 'src/server/context_container/public/ContextContainer';

export class ContextContainerImpl implements ContextContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plugins: Map<CCPluginDispatcher<any>, any> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private contextModules: Map<ContextModuleClass<any>, any> = new Map();

  public constructor(private sentinel: ProofOfBeingCalledByContextContainer) {}

  setPlugin<TPlugin>(
    pluginDispatcher: CCPluginDispatcher<TPlugin>,
    pluginImplementation: TPlugin,
  ): void {
    if (this.plugins.has(pluginDispatcher)) {
      throw new Error('Plugin already set');
    }
    this.plugins.set(pluginDispatcher, pluginImplementation);
  }

  getPlugin<TPlugin>(pluginDispatcher: CCPluginDispatcher<TPlugin>): TPlugin {
    const plugin = this.plugins.get(pluginDispatcher);
    if (plugin == null) {
      throw new Error('Plugin not set');
    }
    return plugin;
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
