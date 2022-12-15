import { MongodbSharingGroup } from 'src/server/adapters/mongodb/sharing_group/types/MongodbSharingGroup';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';

export class MongodbSharingGroupDBProxy implements SharingGroupDBProxy {
  constructor(private readonly mongodbSharingGroup: MongodbSharingGroup) {}

  public async getID(): Promise<string> {
    return this.mongodbSharingGroup._id.toString();
  }

  public async getDisplayName(): Promise<string> {
    return this.mongodbSharingGroup.name;
  }
}
