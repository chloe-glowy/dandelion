export type TestSharingGroupInMemoryDatabaseRowProperties = {
  displayName: string;
  readonly id: string;
};

export class TestSharingGroupInMemoryDatabaseRow {
  public constructor(
    public readonly properties: TestSharingGroupInMemoryDatabaseRowProperties,
  ) {}
}
