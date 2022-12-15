import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import type { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';

export interface AidRequestDBGatewayType {
  load(cc: CC, id: string): Promise<AidRequestDBProxy>;
  create(cc: CC, args: AidRequestCreateArgs): Promise<AidRequest>;
}
