import sendEmail from 'src/server/deprecated/email/sendEmail';
import checkNotificationSettingsAndMaybeNotify from 'src/server/notifications/helpers/checkNotificationSettingsAndMaybeNotify';
import { NotifySpecificRecipientArgs } from 'src/server/notifications/NotifyArgs';
import MentionPartType from 'src/shared/presenter_utils/mentions/MentionPartType';
import { parseValue } from 'src/shared/presenter_utils/mentions/mention_utils';
import { Part } from 'src/shared/presenter_utils/mentions/types';
import getAidRequestTitle from 'src/shared/to_clean/aid_request/getAidRequestTitle';
import aidRequestDetailUrl from 'src/shared/to_clean/urls/aidRequestDetailUrl';
import aidRequestNotificationSettingsUrl from 'src/shared/to_clean/urls/aidRequestNotificationSettingsUrl';

export default async function notifyOneRecipientAboutNewCommentOnAidRequest(
  args: NotifySpecificRecipientArgs,
): Promise<void> {
  const { aidRequest, comment, commenter, recipient } = args;
  const aidRequestID = args.aidRequest._id.toString();
  const commentText = comment.eventSpecificData ?? 'Unknown';
  const { plainText, parts } = parseValue(commentText, [MentionPartType]);
  const wasRecipientTagged = parts.some(
    (part: Part): boolean => part.data?.id === recipient._id.toString(),
  );
  await checkNotificationSettingsAndMaybeNotify({
    args,
    notifiableEvent: wasRecipientTagged
      ? 'YouWereMentionedInAComment'
      : 'NewComment',
    notificationMethod: 'Email',
    notify: async () =>
      await sendEmail({
        recipient,
        templateID: 'NEW_COMMENT_NOTIFICATION_TEMPLATE_ID',
        templateProps: {
          comment_value: plainText,
          commenter_name: commenter.displayName,
          notification_settings_url:
            aidRequestNotificationSettingsUrl(aidRequestID),
          request_url: aidRequestDetailUrl(aidRequestID),
          subject: wasRecipientTagged
            ? `You were tagged by ${
                commenter.displayName
              } in a comment on ${getAidRequestTitle(aidRequest)}`
            : `${commenter.displayName} commented on ${getAidRequestTitle(
                aidRequest,
              )}`,
          what_is_needed: aidRequest.whatIsNeeded,
          who_is_it_for: aidRequest.whoIsItFor,
        },
      }),
  });
}
