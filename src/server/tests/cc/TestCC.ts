import {
  CC,
  ContextContainerFactory,
} from 'src/server/context_container/public/ContextContainer';
import { RequestTime } from 'src/server/context_container/public/RequestTime';

export class TestCC {
  public static async create(): Promise<CC> {
    const cc = ContextContainerFactory.create();
    cc.get(RequestTime).setRequestTime(new Date());
    return cc;
  }
}
