import getTypedError from 'src/shared/language_utils/getTypedError';

export default function getErrorMessage(e: unknown): string {
  return getTypedError(e).message;
}
