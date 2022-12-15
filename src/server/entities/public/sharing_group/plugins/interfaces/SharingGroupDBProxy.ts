export interface SharingGroupDBProxy {
  getID(): Promise<string>;
  getDisplayName(): Promise<string>;
}
