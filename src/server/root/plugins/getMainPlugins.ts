import { MentionsReplacerPluginImpl } from 'src/server/adapters/mentions/MentionsReplacerPluginImpl';
import { MongodbAidRequestDBGateway } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBGateway';
import { MongodbAidRequestSearchPlugin } from 'src/server/adapters/mongodb/aid_request_search/MongodbAidRequestSearchPlugin';
import { MongodbSharingGroupDBGateway } from 'src/server/adapters/mongodb/sharing_group/MongodbSharingGroupDBGateway';
import { MongodbUserDBGateway } from 'src/server/adapters/mongodb/user/MongodbUserDBGateway';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';
import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';
import { MentionsReplacerPlugin } from 'src/server/entities/public/mentions/plugin/MentionsReplacerPlugin';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { AidRequestSearchPlugin } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPlugin';
import getEnvironmentVariableAndThrowIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndThrowIfNotFound';

const searchIndexName = getEnvironmentVariableAndThrowIfNotFound(
  'MONGO_AID_REQUEST_INDEX_NAME',
);

const MAIN_PLUGINS = new PluginCollection([
  {
    dispatcher: MentionsReplacerPlugin,
    plugin: new MentionsReplacerPluginImpl(),
  },
  {
    dispatcher: SharingGroupDBGatewayPlugin,
    plugin: new MongodbSharingGroupDBGateway(),
  },
  {
    dispatcher: UserDBGatewayPlugin,
    plugin: new MongodbUserDBGateway(),
  },
  {
    dispatcher: AidRequestDBGatewayPlugin,
    plugin: new MongodbAidRequestDBGateway(),
  },
  {
    dispatcher: AidRequestSearchPlugin,
    plugin: new MongodbAidRequestSearchPlugin(searchIndexName),
  },
]);

export function getMainPlugins(): PluginCollection {
  return MAIN_PLUGINS;
}
