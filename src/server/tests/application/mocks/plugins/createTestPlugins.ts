import { MentionsReplacerPluginImpl } from 'src/server/adapters/mentions/MentionsReplacerPluginImpl';
import { PluginCollection } from 'src/server/context_container/public/PluginCollection';
import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';
import { MentionsReplacerPlugin } from 'src/server/entities/public/mentions/plugin/MentionsReplacerPlugin';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { TestAidRequestDBGateway } from 'src/server/tests/application/mocks/db/aid_request/TestAidRequestDBGateway';
import { TestSharingGroupDBGateway } from 'src/server/tests/application/mocks/db/sharing_group/TestSharingGroupDBGateway';
import { TestUserDBGateway } from 'src/server/tests/application/mocks/db/user/TestUserDBGateway';

export function createTestPlugins(): PluginCollection {
  return new PluginCollection([
    {
      dispatcher: MentionsReplacerPlugin,
      plugin: new MentionsReplacerPluginImpl(),
    },
    {
      dispatcher: SharingGroupDBGatewayPlugin,
      plugin: new TestSharingGroupDBGateway(),
    },
    {
      dispatcher: UserDBGatewayPlugin,
      plugin: new TestUserDBGateway(),
    },
    {
      dispatcher: AidRequestDBGatewayPlugin,
      plugin: new TestAidRequestDBGateway(),
    },
  ]);
}