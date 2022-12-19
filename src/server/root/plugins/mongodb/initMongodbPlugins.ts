import { MongodbAidRequestDBGateway } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBGateway';
import { MongodbAidRequestSearchPlugin } from 'src/server/adapters/mongodb/aid_request_search/MongodbAidRequestSearchPlugin';
import { MongodbSharingGroupDBGateway } from 'src/server/adapters/mongodb/sharing_group/MongodbSharingGroupDBGateway';
import { MongodbUserDBGateway } from 'src/server/adapters/mongodb/user/MongodbUserDBGateway';
import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { AidRequestSearchPlugin } from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPlugin';
import getEnvironmentVariableAndThrowIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndThrowIfNotFound';

const searchIndexName = getEnvironmentVariableAndThrowIfNotFound(
  'MONGO_AID_REQUEST_INDEX_NAME',
);

export function initMongodbPlugins(): void {
  SharingGroupDBGatewayPlugin.set(new MongodbSharingGroupDBGateway());
  UserDBGatewayPlugin.set(new MongodbUserDBGateway());
  AidRequestDBGatewayPlugin.set(new MongodbAidRequestDBGateway());
  AidRequestSearchPlugin.set(
    new MongodbAidRequestSearchPlugin(searchIndexName),
  );
}
