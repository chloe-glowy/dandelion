import {
  ContextContainerFactory,
  createPluginReference,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';

describe('CC', () => {
  it('Gets the plugin that was set', () => {
    const pluginReference = createPluginReference<PluginType>();
    const cc = ContextContainerFactory.create(
      new PluginCollection([
        {
          implementation: PluginImplA,
          reference: pluginReference,
        },
      ]),
    );
    expect(cc.getPlugin(pluginReference)).toBe(PluginImplA);
  });

  it('Fails to get plugin if not set', () => {
    const pluginReference = createPluginReference<PluginType>();
    const cc = ContextContainerFactory.create(new PluginCollection([]));
    expect(() => cc.getPlugin(pluginReference)).toThrow();
  });
});

type PluginType = {
  double(n: number): number;
};

const PluginImplA: PluginType = {
  double: (n: number) => n * 2,
};
