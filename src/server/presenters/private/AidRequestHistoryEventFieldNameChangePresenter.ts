export abstract class AidRequestHistoryEventFieldNameChangePresenter {
  public static get(
    fieldName: string,
    oldValue: string,
    newValue: string,
  ): string {
    return `Changed the ${fieldName} from "${oldValue ?? 'unknown'}" to "${
      newValue ?? 'unknown'
    }"`;
  }
}
