export interface AuthenticationType {
  sendRegistrationTokenToEmail(emailAddress: string): Promise<void>;
  authenticateEmailAddress(token: string): Promise<AuthenticatedEmailAddress>;
  getAuthenticatedUserID(token: string): Promise<string>;
}

export type AuthenticatedEmailAddress = Readonly<{
  emailAddress: string;
}>;
