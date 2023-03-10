import { UserModel } from 'src/server/adapters/mongodb/collections/user/UserModel';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import sendEmail from 'src/server/deprecated/email/sendEmail';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { encrypt } from 'src/server/to_clean/crypto/encryption';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import sleep from 'src/server/to_clean/sleep';
// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import passwordResetUrl from 'src/shared/to_clean/urls/passwordResetUrl';

async function sendPasswordResetEmailResolver(
  _: unknown,
  { username }: { username: string },
  _req: Express.Request,
): Promise<string> {
  if (!username.trim()) {
    return 'Please enter your email address in the box above.';
  }
  const user = await UserModel.findOne({ username });
  if (user != null) {
    const expireTime = Math.ceil(new Date().getTime() / 1000) + 3600;
    const userID = user._id.toString();
    const token = encrypt(`${expireTime}.${userID}`);
    await sendEmail({
      recipient: user,
      templateID: 'PASSWORD_RESET_EMAIL_TEMPLATE_ID',
      templateProps: {
        password_reset_url: passwordResetUrl(token),
      },
    });
  }

  // Wait a couple seconds for the email to send
  await sleep({ ms: 2500 });

  return `If ${username} is a valid email address and is associated with an account, we emailed a password reset link to that address. Please check your email to continue.`;
}

const sendPasswordResetEmail = {
  args: {
    username: 'String!',
  },
  resolve: sendPasswordResetEmailResolver,
  type: 'String!',
};

export default sendPasswordResetEmail;
