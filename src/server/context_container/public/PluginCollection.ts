import { CCPluginDispatcher } from 'src/server/context_container/public/ContextContainer';

type PluginSpec<TPlugin> = Readonly<{
  dispatcher: CCPluginDispatcher<TPlugin>;
  plugin: TPlugin;
}>;

export class PluginCollection {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plugins: Map<CCPluginDispatcher<any>, any> = new Map();

  public constructor(plugins: ReadonlyArray<PluginSpec<unknown>>) {
    for (const plugin of plugins) {
      this.plugins.set(plugin.dispatcher, plugin.plugin);
    }
  }

  public get<TPlugin>(pluginDispatcher: CCPluginDispatcher<TPlugin>): TPlugin {
    const plugin = this.plugins.get(pluginDispatcher);
    if (plugin == null) {
      throw new Error('Plugin not set');
    }
    return plugin;
  }
}
