import { GraphQLSharingGroupProperties } from 'src/server/adapters/graphql/sharing_group/GraphQLSharingGroupTypes';
import { SharingGroupPresenter } from 'src/server/presenters/public/sharing_group/SharingGroupPresenter';

export class GraphQLSharingGroupProxy implements GraphQLSharingGroupProperties {
  constructor(public readonly sharingGroup: SharingGroupPresenter) {}

  public async id(): Promise<string> {
    return await this.sharingGroup.getID();
  }

  public async displayName(): Promise<string> {
    return await this.sharingGroup.getDisplayName();
  }
}
