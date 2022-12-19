export abstract class TestID {
  private static counter = 1;

  public static create(type_: string): string {
    return `test-${type_}-id-${this.counter++}`;
  }
}
