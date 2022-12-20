import { ObjectId } from 'mongodb';
import { MongodbSharingGroupModel } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel';
import { MongodbSharingGroupDBProxy } from 'src/server/adapters/mongodb/sharing_group/MongodbSharingGroupDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupCreateArgs } from 'src/server/entities/public/sharing_group/mutations/SharingGroupCreate';
import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import { User } from 'src/server/entities/public/user/User';

export class MongodbSharingGroupDBGateway implements SharingGroupDBGatewayType {
  async load(cc: CC, id: string): Promise<SharingGroupDBProxy> {
    const mongodbSharingGroup = await MongodbSharingGroupModel.findById(
      new ObjectId(id),
    );
    if (mongodbSharingGroup == null) {
      throw new Error('SharingGroup not found');
    }
    return new MongodbSharingGroupDBProxy(mongodbSharingGroup);
  }

  async createAndAddCreatorAsSoleMember(
    cc: CC,
    args: SharingGroupCreateArgs,
    creator: User,
  ): Promise<SharingGroup> {
    cc;
    args;
    creator;
    throw new Error(
      'MongodbSharingGroupDBGateway.createAndAddCreatorAsSoleMember not implemented',
    );
  }
}
