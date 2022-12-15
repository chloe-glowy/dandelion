export type AidRequestEditResponse = Readonly<{
  // If provided, this is a string that can later be passed to AidRequest.undo to undo this edit.
  historyEventIDForUndo: string | undefined;
}>;
