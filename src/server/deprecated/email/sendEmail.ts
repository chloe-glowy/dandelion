import sendgridMail from '@sendgrid/mail';
import analytics from 'src/server/deprecated/analytics/index';
import { EmailTemplateType } from 'src/server/deprecated/email/EmailTemplateTypes';
import getEnvironmentVariableAndThrowIfNotFound from 'src/shared/to_clean/env/getEnvironmentVariableAndThrowIfNotFound';
import getEmailAddress from 'src/shared/to_clean/urls/getEmailAddress';

const SENDGRID_API_KEY =
  getEnvironmentVariableAndThrowIfNotFound('SENDGRID_API_KEY');

sendgridMail.setApiKey(SENDGRID_API_KEY);

type Args = EmailTemplateType & {
  recipient: Express.User;
};

const FROM_EMAIL = getEmailAddress({ emailUser: 'notifications' });

export default async function sendEmail({
  templateID,
  templateProps,
  recipient,
}: Args) {
  const templateId = process.env[templateID];
  if (templateId == null) {
    throw new Error('Template ID not defined in .env: ' + templateID);
  }
  analytics.track({
    event: 'Sending Email',
    properties: {
      ...templateProps,
      templateID,
    },
    user: recipient,
  });
  const msg = {
    dynamicTemplateData: templateProps,
    from: FROM_EMAIL,
    templateId,
    to: recipient.username,
  };
  try {
    await sendgridMail.send(msg);
  } catch (e) {
    analytics.track({
      event: 'Send Email Failed',
      properties: {
        errors: tryToGetErrorsFromSendgridResponse(e),
      },
      user: recipient,
    });
    throw e;
  }
}

function tryToGetErrorsFromSendgridResponse(e: unknown): string {
  return JSON.stringify(
    (e as { response: { body: { errors: unknown } } }).response.body.errors,
  );
}
