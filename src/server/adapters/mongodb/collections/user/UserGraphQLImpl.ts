import changeName from 'src/server/adapters/mongodb/collections/user/mutations/changeName';
import login from 'src/server/adapters/mongodb/collections/user/mutations/login';
import logout from 'src/server/adapters/mongodb/collections/user/mutations/logout';
import register from 'src/server/adapters/mongodb/collections/user/mutations/register';
import resetPassword from 'src/server/adapters/mongodb/collections/user/mutations/resetPassword';
import sendPasswordResetEmail from 'src/server/adapters/mongodb/collections/user/mutations/sendPasswordResetEmail';
import aidRequestsIAmWorkingOn from 'src/server/adapters/mongodb/collections/user/object_fields/aidRequestsIAmWorkingOn';
import sharingGroups from 'src/server/adapters/mongodb/collections/user/object_fields/sharingGroups';
import taggableUsers from 'src/server/adapters/mongodb/collections/user/object_fields/taggableUsers';
import username from 'src/server/adapters/mongodb/collections/user/object_fields/username';
import me from 'src/server/adapters/mongodb/collections/user/root_fields/me';
import resetPasswordLinkDetails from 'src/server/adapters/mongodb/collections/user/root_fields/resetPasswordLinkDetails';
import { UserGraphQLType } from 'src/server/adapters/mongodb/collections/user/UserGraphQLTypes';

UserGraphQLType.addFields({
  aidRequestsIAmWorkingOn,
  sharingGroups,
  taggableUsers,
  username,
});

const User = {
  MutationFields: {
    changeName,
    login,
    logout,
    register,
    resetPassword,
    sendPasswordResetEmail,
  },
  QueryFields: {
    me,
    resetPasswordLinkDetails,
  },
};

export default User;
