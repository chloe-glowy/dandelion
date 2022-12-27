export async function testCatch<T>(callback: () => Promise<T>): Promise<Error> {
  try {
    await callback();
    throw new Error('Expected an error to be thrown');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw new Error(
      'Expected an error to be thrown. Instead, this was thrown: ' + e,
    );
  }
}
