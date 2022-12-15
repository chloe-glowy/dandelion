export interface AidRequestActionOptionPresenter {
  getOptionLabel(): Promise<string>;
  getIconName(): Promise<string>;
}
