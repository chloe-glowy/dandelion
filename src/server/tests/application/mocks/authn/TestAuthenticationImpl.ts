import {
  AuthenticatedEmailAddress,
  AuthenticationType,
} from 'src/server/entities/public/authentication/Authentication';
import { TestID } from 'src/server/tests/application/mocks/TestID';

export class TestAuthenticationImpl implements AuthenticationType {
  private db: Array<{
    emailAddress: string;
    registrationToken: string;
    userID: string;
    isAuthenticated: boolean;
  }> = [];

  public async sendRegistrationTokenToEmail(
    emailAddress: string,
  ): Promise<void> {
    const userID = TestID.create('auth');
    const registrationToken = TestID.create(
      `registration-token-${Math.random()}`,
    );
    this.db.push({
      emailAddress,
      isAuthenticated: false,
      registrationToken,
      userID,
    });
  }

  public async authenticateEmailAddress(
    token: string,
  ): Promise<AuthenticatedEmailAddress> {
    const row = this.db.find((row) => row.registrationToken === token);
    if (row == null) {
      throw new Error('Failed to find row');
    }
    row.isAuthenticated = true;
    return { emailAddress: row.emailAddress };
  }

  public async getAuthenticatedUserID(token: string): Promise<string> {
    const row = this.db.find((row) => row.registrationToken === token);
    if (row == null) {
      throw new Error('Failed to find row');
    }
    if (!row.isAuthenticated) {
      throw new Error('User is not authenticated');
    }
    return row.userID;
  }
}
