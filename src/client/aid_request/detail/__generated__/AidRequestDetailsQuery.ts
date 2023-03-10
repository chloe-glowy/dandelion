/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AidRequestUpdateActionType, AidRequestHistoryEventType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: AidRequestDetailsQuery
// ====================================================

export interface AidRequestDetailsQuery_aidRequest_sharingGroup {
  __typename: "SharingGroup";
  id: string;
  name: string;
}

export interface AidRequestDetailsQuery_aidRequest_whoRecordedIt {
  __typename: "User";
  displayName: string;
}

export interface AidRequestDetailsQuery_aidRequest_whoIsWorkingOnItUsers {
  __typename: "User";
  _id: string;
}

export interface AidRequestDetailsQuery_aidRequest_actionsAvailable_input {
  __typename: "AidRequestActionInput";
  action: AidRequestUpdateActionType;
  event: AidRequestHistoryEventType;
}

export interface AidRequestDetailsQuery_aidRequest_actionsAvailable {
  __typename: "AidRequestActionOption";
  icon: string | null;
  message: string;
  input: AidRequestDetailsQuery_aidRequest_actionsAvailable_input;
}

export interface AidRequestDetailsQuery_aidRequest_status_people {
  __typename: "User";
  displayName: string;
}

export interface AidRequestDetailsQuery_aidRequest_status {
  __typename: "StatusSummary";
  message: string;
  people: AidRequestDetailsQuery_aidRequest_status_people[];
}

export interface AidRequestDetailsQuery_aidRequest_activity_actor {
  __typename: "User";
  displayName: string;
}

export interface AidRequestDetailsQuery_aidRequest_activity {
  __typename: "AidRequestActivityItem";
  _id: string;
  actor: AidRequestDetailsQuery_aidRequest_activity_actor | null;
  isComment: boolean;
  message: string;
  when: string;
}

export interface AidRequestDetailsQuery_aidRequest {
  __typename: "AidRequest";
  _id: string | null;
  createdAt: any;
  completed: boolean;
  lastUpdated: any;
  latestEvent: string;
  sharingGroup: AidRequestDetailsQuery_aidRequest_sharingGroup;
  whatIsNeeded: string;
  whoIsItFor: string;
  whoRecordedIt: AidRequestDetailsQuery_aidRequest_whoRecordedIt | null;
  whoIsWorkingOnItUsers: (AidRequestDetailsQuery_aidRequest_whoIsWorkingOnItUsers | null)[] | null;
  actionsAvailable: (AidRequestDetailsQuery_aidRequest_actionsAvailable | null)[] | null;
  status: AidRequestDetailsQuery_aidRequest_status;
  activity: AidRequestDetailsQuery_aidRequest_activity[];
}

export interface AidRequestDetailsQuery {
  aidRequest: AidRequestDetailsQuery_aidRequest;
}

export interface AidRequestDetailsQueryVariables {
  aidRequestID: string;
}
