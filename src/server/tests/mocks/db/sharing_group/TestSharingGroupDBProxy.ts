import { CC } from 'src/server/context_container/public/ContextContainer';
import { SharingGroupDBProxy } from 'src/server/entities/public/sharing_group/plugins/interfaces/SharingGroupDBProxy';
import { TestSharingGroupInMemoryDatabaseRow } from 'src/server/tests/mocks/db/sharing_group/TestSharingGroupInMemoryDatabaseRow';

export class TestSharingGroupDBProxy implements SharingGroupDBProxy {
  constructor(
    private readonly cc: CC,
    private readonly row: TestSharingGroupInMemoryDatabaseRow,
  ) {}

  public async getID(): Promise<string> {
    return this.row.properties.id;
  }

  public async getDisplayName(): Promise<string> {
    return this.row.properties.displayName;
  }
}
