export type Properties = {
  id: string;
  displayName: string;
  sharingGroupIDs: ReadonlyArray<string>;
};

export class TestUserInMemoryDatabaseRow {
  public constructor(public readonly properties: Properties) {}
}
