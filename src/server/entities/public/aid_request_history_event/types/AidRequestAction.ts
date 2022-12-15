/**
 * @deprecated Use the GraphQL-specific or Mongodb-specific versions of these.
 * There's no reason the Entities layer needs to know about these enums.
 */
export class AidRequestAction {
  public constructor(
    public readonly addOrRemove: AidRequestActionAddOrRemove,
    public readonly actionType: AidRequestActionType,
  ) {}
}

/**
 * @deprecated Use the GraphQL-specific or Mongodb-specific versions of these.
 * There's no reason the Entities layer needs to know about these enums.
 */
export type AidRequestActionAddOrRemove = 'Add' | 'Remove';

/**
 * @deprecated Use the GraphQL-specific or Mongodb-specific versions of these.
 * There's no reason the Entities layer needs to know about these enums.
 */
export type AidRequestActionType =
  | 'ChangedWhoIsItFor'
  | 'ChangedWhatIsNeeded'
  | 'Comment'
  | 'Completed'
  | 'Created'
  | 'Deleted'
  | 'WorkingOn';
