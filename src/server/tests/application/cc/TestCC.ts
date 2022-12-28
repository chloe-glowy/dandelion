import {
  CC,
  ContextContainerFactory,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';
import { RequestTime } from 'src/server/context_container/public/RequestTime';

export class TestCC {
  public static async create(
    plugins: PluginCollection,
    requestTime: Date | undefined = undefined,
  ): Promise<CC> {
    const cc = ContextContainerFactory.create(plugins);
    cc.getSingleton(RequestTime).setRequestTime(requestTime ?? new Date());
    return cc;
  }
}
