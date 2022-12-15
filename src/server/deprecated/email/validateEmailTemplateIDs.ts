import { ALL_EMAIL_TEMPLATE_TYPES } from 'src/server/deprecated/email/EmailTemplateTypes';
import getEnvironmentVariableAndReturnUndefinedIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndReturnUndefinedIfNotFound';

export default function validateEmailTemplateIDs(): void {
  Object.keys(ALL_EMAIL_TEMPLATE_TYPES).forEach((templateID: string): void => {
    const templateId =
      getEnvironmentVariableAndReturnUndefinedIfNotFound(templateID);
    if (templateId == null) {
      throw new Error('Not present in .env: ' + templateID);
    }
  });
}
