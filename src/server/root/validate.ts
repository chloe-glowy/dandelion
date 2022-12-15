import * as AidRequestNotificationsConfig from 'src/server/adapters/mongodb/collections/aid_request_notification_settings/config/AidRequestNotificationsConfig';
import validateEmailTemplateIDs from 'src/server/deprecated/email/validateEmailTemplateIDs';

export default function validate(): void {
  AidRequestNotificationsConfig.validate();
  validateEmailTemplateIDs();
}
