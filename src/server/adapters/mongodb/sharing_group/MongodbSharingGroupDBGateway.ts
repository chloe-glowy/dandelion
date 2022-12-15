import { ObjectId } from 'mongodb';
import { MongodbSharingGroupModel } from 'src/server/adapters/mongodb/sharing_group/model/MongodbSharingGroupModel';
import { MongodbSharingGroupDBProxy } from 'src/server/adapters/mongodb/sharing_group/MongodbSharingGroupDBProxy';
import { SharingGroupDBGatewayType } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBGatewayType';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';

export class MongodbSharingGroupDBGateway implements SharingGroupDBGatewayType {
  async load(id: string): Promise<SharingGroupDBProxy> {
    const mongodbSharingGroup = await MongodbSharingGroupModel.findById(
      new ObjectId(id),
    );
    if (mongodbSharingGroup == null) {
      throw new Error('SharingGroup not found');
    }
    return new MongodbSharingGroupDBProxy(mongodbSharingGroup);
  }
}
