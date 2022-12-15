export class AidRequestAction {
  // TypeScript thinks that any object can be passed as an instance of this
  // class if it's completely empty.
  doNothing__AidRequestAction(): void {
    throw new Error("Don't call this method.");
  }
}
