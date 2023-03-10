/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AidRequestUpdateActionType, AidRequestHistoryEventType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAidRequestsMutation
// ====================================================

export interface CreateAidRequestsMutation_createAidRequests_requests_sharingGroup {
  __typename: "SharingGroup";
  id: string;
  name: string;
}

export interface CreateAidRequestsMutation_createAidRequests_requests_whoRecordedIt {
  __typename: "User";
  displayName: string;
}

export interface CreateAidRequestsMutation_createAidRequests_requests_whoIsWorkingOnItUsers {
  __typename: "User";
  _id: string;
}

export interface CreateAidRequestsMutation_createAidRequests_requests_actionsAvailable_input {
  __typename: "AidRequestActionInput";
  action: AidRequestUpdateActionType;
  event: AidRequestHistoryEventType;
}

export interface CreateAidRequestsMutation_createAidRequests_requests_actionsAvailable {
  __typename: "AidRequestActionOption";
  icon: string | null;
  message: string;
  input: CreateAidRequestsMutation_createAidRequests_requests_actionsAvailable_input;
}

export interface CreateAidRequestsMutation_createAidRequests_requests {
  __typename: "AidRequest";
  _id: string | null;
  createdAt: any;
  completed: boolean;
  lastUpdated: any;
  latestEvent: string;
  sharingGroup: CreateAidRequestsMutation_createAidRequests_requests_sharingGroup;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoRecordedIt: CreateAidRequestsMutation_createAidRequests_requests_whoRecordedIt | null;
  whoIsWorkingOnItUsers: (CreateAidRequestsMutation_createAidRequests_requests_whoIsWorkingOnItUsers | null)[] | null;
  actionsAvailable: (CreateAidRequestsMutation_createAidRequests_requests_actionsAvailable | null)[] | null;
}

export interface CreateAidRequestsMutation_createAidRequests {
  __typename: "CreateAidRequestsPayload";
  postpublishSummary: string;
  requests: (CreateAidRequestsMutation_createAidRequests_requests | null)[] | null;
}

export interface CreateAidRequestsMutation {
  createAidRequests: CreateAidRequestsMutation_createAidRequests | null;
}

export interface CreateAidRequestsMutationVariables {
  sharingGroupID: string;
  whatIsNeeded: string[];
  whoIsItFor?: string | null;
  whoIsItForMulti?: string[] | null;
}
