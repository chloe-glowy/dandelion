import type { Express } from 'express';

import {
  CC,
  ContextContainerFactory,
} from 'src/server/context_container/public/ContextContainer';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';
import { RequestTime } from 'src/server/context_container/public/RequestTime';

declare global {
  namespace Express {
    interface Request {
      cc: CC;
    }
  }
}

export function initCCforExpress(
  app: Express,
  plugins: PluginCollection,
): void {
  app.use((req, _res, next) => {
    const cc = ContextContainerFactory.create(plugins);
    cc.getSingleton(RequestTime).setRequestTime(new Date());
    req.cc = cc;
    next();
  });
}
