import getEnvironmentVariableAndReturnUndefinedIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndReturnUndefinedIfNotFound';

const MONGODB_DB_NAME =
  getEnvironmentVariableAndReturnUndefinedIfNotFound('MONGODB_DB_NAME');
const ENVIRONMENT_IS_USING_TEST_DATABASE = MONGODB_DB_NAME === 'AidApp-Test';

export default ENVIRONMENT_IS_USING_TEST_DATABASE;
