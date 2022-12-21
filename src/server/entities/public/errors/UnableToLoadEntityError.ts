export class UnableToLoadEntityError extends Error {
  constructor(public readonly entityType: string, public readonly id: string) {
    super(`Unable to load ${entityType} with id ${id}`);
  }
}
