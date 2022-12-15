import { initMongodbPlugins } from 'src/server/root/plugins/mongodb/initMongodbPlugins';

export function initDBPlugins(): void {
  initMongodbPlugins();
}
