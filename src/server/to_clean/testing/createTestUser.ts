import createTestSharingGroup from 'src/server/to_clean/testing/createTestSharingGroup';
import nextTestID from 'src/server/to_clean/testing/nextTestID';

jest.mock('src/server/adapters/mongodb/collections/user/UserModel', () => ({
  UserModel: {
    findById,
  },
}));

const testUsers: Map<string, Express.User> = new Map();

export default function createTestUser(
  user_?: Partial<Express.User>,
): Express.User {
  const user = fillInDefaults(user_);
  testUsers.set(user._id.toString(), user);
  return user;
}

function findById(id: string): Express.User | undefined {
  return testUsers.get(id.toString());
}

function fillInDefaults(user?: Partial<Express.User>): Express.User {
  return {
    _id: nextTestID(),
    aidRequestsIAmWorkingOn: [],
    crews: ['Test Crew 1'],
    displayName: nextDisplayName(),
    sharingGroups: [createTestSharingGroup()._id],
    username: nextUsername(),
    ...(user ?? {}),
  };
}

let displayNameCount = 0;
function nextDisplayName(): string {
  displayNameCount++;
  return `Person ${displayNameCount}`;
}

let usernameCount = 0;
function nextUsername(): string {
  usernameCount++;
  return `person_${usernameCount}@dandelion.supplies`;
}
