import { GraphQLAidRequestActionOptionProperties } from 'src/server/adapters/graphql/aid_request_action_option/GraphQLAidRequestActionOptionTypes';
import { GraphQLAidRequestActionOptionAPIArgsFactory } from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsFactory';
import { GraphQLAidRequestActionOptionAPIArgsProperties } from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';
import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class GraphQLAidRequestActionOptionProxy
  implements GraphQLAidRequestActionOptionProperties
{
  constructor(public readonly option: AidRequestActionOptionPresenter) {}

  public async apiArgs(): Promise<GraphQLAidRequestActionOptionAPIArgsProperties> {
    return GraphQLAidRequestActionOptionAPIArgsFactory.create(this.option);
  }

  public async message(): Promise<string> {
    return this.option.getOptionLabel();
  }

  public async icon(): Promise<string> {
    return this.option.getIconName();
  }
}
