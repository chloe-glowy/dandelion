import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestAction } from 'src/server/entities/public/aid_request_action/interface/AidRequestAction';

export type EditAidRequestInteractorArgs = Readonly<{
  aidRequestID: string;
  action: AidRequestAction;
}>;

export type EditAidRequestInteractorResult = Readonly<{
  aidRequest: AidRequest;
  historyEventIDForUndo: string | undefined;
}>;
