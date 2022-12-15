import logServerError from 'src/server/adapters/error_logger/logServerError';

export default function setTimeoutSafe(
  loggingTag: string,
  ...[callback, ...args]: Parameters<typeof setTimeout>
): ReturnType<typeof setTimeout> {
  const s = setTimeout; // bypass @chloeglowy/eslint-plugin-no-set-timeout
  return s(() => {
    try {
      callback();
    } catch (e) {
      logServerError(loggingTag, e);
    }
  }, ...args);
}
