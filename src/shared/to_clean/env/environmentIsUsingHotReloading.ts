import getEnvironmentVariableAndReturnUndefinedIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndReturnUndefinedIfNotFound';

export default function environmentIsUsingHotReloading(): boolean {
  return (
    getEnvironmentVariableAndReturnUndefinedIfNotFound('HOT_RELOAD') === 'True'
  );
}
