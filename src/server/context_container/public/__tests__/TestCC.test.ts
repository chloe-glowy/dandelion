import {
  CC,
  CCPluginDispatcher,
  ContextContainerFactory,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

describe('CC', () => {
  it('Gets the plugin that was set', () => {
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      getImpl: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    const cc = ContextContainerFactory.create(
      new PluginCollection([
        {
          dispatcher: pluginDispatcher,
          plugin: PluginImplA,
        },
      ]),
    );
    expect(cc.getPlugin(pluginDispatcher)).toBe(PluginImplA);
  });

  it('Fails to get plugin if not set', () => {
    const pluginDispatcher: CCPluginDispatcher<Plugin> = {
      getImpl: (cc: CC) => cc.getPlugin(pluginDispatcher),
    };
    const cc = ContextContainerFactory.create(new PluginCollection([]));
    expect(() => cc.getPlugin(pluginDispatcher)).toThrow();
  });
});

type Plugin = {
  double(n: number): number;
};

const PluginImplA: Plugin = {
  double: (n: number) => n * 2,
};
