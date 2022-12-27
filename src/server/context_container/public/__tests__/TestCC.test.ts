import {
  CC,
  CCPluginDispatcher,
  ContextContainerFactory,
} from 'src/server/context_container/public/ContextContainer';

describe('CC', () => {
  it('Does not allow a plugin to be set for a dispatcher if the same plugin is passed twice', () => {
    const cc = ContextContainerFactory.create();
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      create: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    cc.setPlugin(pluginDispatcher, PluginImplA);
    expect(() => cc.setPlugin(pluginDispatcher, PluginImplA)).toThrow();
  });

  it('Does not allow a plugin to be set for a dispatcher if a different plugin is passed', () => {
    const cc = ContextContainerFactory.create();
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      create: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    cc.setPlugin(pluginDispatcher, PluginImplA);
    expect(() => cc.setPlugin(pluginDispatcher, PluginImplB)).toThrow();
  });

  it('Gets the plugin that was set', () => {
    const cc = ContextContainerFactory.create();
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      create: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    cc.setPlugin(pluginDispatcher, PluginImplA);
    expect(cc.getPlugin(pluginDispatcher)).toBe(PluginImplA);
  });

  it('Fails to get plugin if not set', () => {
    const cc = ContextContainerFactory.create();
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      create: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    expect(() => cc.getPlugin(pluginDispatcher)).toThrow();
  });
});

type Plugin = {
  double(n: number): number;
};

const PluginImplA: Plugin = {
  double: (n: number) => n * 2,
};

const PluginImplB: Plugin = {
  double: (n: number) => n * 2 + 1,
};
