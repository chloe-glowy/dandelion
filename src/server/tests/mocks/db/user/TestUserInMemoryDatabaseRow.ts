import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';

export type Properties = {
  id: string;
  displayName: string;
  sharingGroups: ReadonlyArray<SharingGroup>;
};

export class TestUserInMemoryDatabaseRow {
  public constructor(public readonly properties: Properties) {}
}
