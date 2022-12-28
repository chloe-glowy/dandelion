import { GraphQLAidRequestActionOptionAPIArgsProperties } from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';
import { GraphQLAidRequestDeleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestDeleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs';
import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';

export class GraphQLAidRequestActionOptionAPIArgsFactory {
  public static create(
    option: AidRequestActionOptionPresenter,
  ): GraphQLAidRequestActionOptionAPIArgsProperties {
    return option.handleSubtype({
      AidRequestDeleteActionOptionPresenter: () =>
        new GraphQLAidRequestDeleteActionOptionAPIArgs(),
      AidRequestMarkAsCompleteActionOptionPresenter: () =>
        new GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs(),
      AidRequestMarkAsIncompleteActionOptionPresenter: () =>
        new GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs(),
      AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter: () =>
        new GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs(),
      AidRequestMarkAsViewerWorkingOnItActionOptionPresenter: () =>
        new GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs(),
    });
  }
}
