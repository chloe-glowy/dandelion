import { AidRequestDBGatewayPlugin } from 'src/server/entities/public/aid_request/plugins/AidRequestDBGatewayPlugin';
import { SharingGroupDBGatewayPlugin } from 'src/server/entities/public/sharing_group/plugins/SharingGroupDBLoader';
import { UserDBGatewayPlugin } from 'src/server/entities/public/user/plugins/UserDBGatewayPlugin';
import { TestAidRequestDBGateway } from 'src/server/tests/mocks/db/aid_request/TestAidRequestDBGateway';
import { TestSharingGroupDBGateway } from 'src/server/tests/mocks/db/sharing_group/TestSharingGroupDBGateway';
import { TestUserDBGateway } from 'src/server/tests/mocks/db/user/TestUserDBGateway';

export function initTestDBPlugins(): void {
  SharingGroupDBGatewayPlugin.set(new TestSharingGroupDBGateway());
  UserDBGatewayPlugin.set(new TestUserDBGateway());
  AidRequestDBGatewayPlugin.set(new TestAidRequestDBGateway());
}
