import {
  CCPluginDispatcher,
  ContextContainer,
  ContextModule,
  ContextModuleClass,
  ProofOfBeingCalledByContextContainer,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

export class ContextContainerImpl implements ContextContainer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private contextModules: Map<ContextModuleClass<any>, any> = new Map();

  public constructor(
    private readonly sentinel: ProofOfBeingCalledByContextContainer,
    private readonly plugins: PluginCollection,
  ) {}

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
