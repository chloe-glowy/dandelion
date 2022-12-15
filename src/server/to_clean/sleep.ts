import setTimeoutSafe from 'src/server/to_clean/setTimeoutSafe';

export default async function sleep({ ms }: { ms: number }): Promise<void> {
  return await new Promise((resolve) =>
    setTimeoutSafe('sleep:resolve', resolve, ms),
  );
}
