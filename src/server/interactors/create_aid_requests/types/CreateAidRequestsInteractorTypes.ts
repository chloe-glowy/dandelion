import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';

export type CreateAidRequestsInteractorArgs = Readonly<{
  sharingGroupID: string;
  whatIsNeeded: ReadonlyArray<string>;
  whoIsItFor: ReadonlyArray<string>;
}>;

export type CreateAidRequestsInteractorResult = Readonly<{
  aidRequests: ReadonlyArray<AidRequest>;
}>;
