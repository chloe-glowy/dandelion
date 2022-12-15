import getEnvironmentVariableAndReturnUndefinedIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndReturnUndefinedIfNotFound';

export type ScriptOptionsType = {
  isDryRun: boolean;
};

const IS_DRY_RUN =
  (getEnvironmentVariableAndReturnUndefinedIfNotFound('IS_DRY_RUN') ??
    'True') !== 'False';

const OPTIONS: ScriptOptionsType = {
  isDryRun: IS_DRY_RUN,
};

export function getScriptOptions(): ScriptOptionsType {
  return OPTIONS;
}
