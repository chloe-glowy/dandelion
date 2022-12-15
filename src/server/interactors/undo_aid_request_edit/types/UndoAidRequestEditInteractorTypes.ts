import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';

export type UndoAidRequestEditInteractorArgs = {
  aidRequestID: string;
  historyEventID: string;
};

export type UndoAidRequestEditInteractorResult = {
  aidRequest: AidRequest;
};
