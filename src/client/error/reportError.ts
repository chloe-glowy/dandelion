import getTypedError from 'src/shared/language_utils/getTypedError';

export default function reportError(e: unknown): void {
  const error = getTypedError(e);
  console.error(error);
}
