import { MongodbAidRequestModel } from 'src/server/adapters/mongodb/aid_request/model/MongodbAidRequestModel';
import { MongodbAidRequestCreateImpl } from 'src/server/adapters/mongodb/aid_request/mutations/MongodbAidRequestCreateImpl';
import { MongodbAidRequestDBProxy } from 'src/server/adapters/mongodb/aid_request/MongodbAidRequestDBProxy';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreateArgs } from 'src/server/entities/public/aid_request/mutations/AidRequestCreate';
import { AidRequestDBGatewayType } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBGatewayType';
import { AidRequestDBProxy } from 'src/server/entities/public/aid_request/plugins/interfaces/AidRequestDBProxy';

export class MongodbAidRequestDBGateway implements AidRequestDBGatewayType {
  async load(cc: CC, id: string): Promise<AidRequestDBProxy> {
    const mongodbAidRequest = await MongodbAidRequestModel.findById(id);
    if (mongodbAidRequest == null) {
      throw new Error('AidRequest not found: ' + id);
    }
    return new MongodbAidRequestDBProxy(cc, mongodbAidRequest);
  }

  async create(cc: CC, args: AidRequestCreateArgs): Promise<AidRequest> {
    return await MongodbAidRequestCreateImpl.execute(cc, args);
  }
}
