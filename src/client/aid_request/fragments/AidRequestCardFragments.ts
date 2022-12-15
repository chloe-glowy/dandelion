import { gql } from '@apollo/client';

export const AidRequestEditDrawerFragments = {
  aidRequest: gql`
    fragment AidRequestEditDrawerFragment on AidRequest {
      _id
      actionsAvailable {
        icon
        message
        input {
          action
          event
        }
      }
    }
  `,
};

export const AidRequestCardFragments = {
  aidRequest: gql`
    fragment AidRequestCardFragment on AidRequest {
      _id
      createdAt
      completed
      lastUpdated
      latestEvent
      sharingGroup {
        id: _id
        name
      }
      whatIsNeeded
      whoIsItFor
      whoRecordedIt {
        displayName
      }
      whoIsWorkingOnItUsers {
        _id
      }
      ...AidRequestEditDrawerFragment
    }
    ${AidRequestEditDrawerFragments.aidRequest}
  `,
};
