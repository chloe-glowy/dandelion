import { GraphQLAidRequestActionOptionAPIArgsProperties } from 'src/server/adapters/graphql/aid_request_action_option_api_args/GraphQLAidRequestActionOptionAPIArgsTypes';
import { GraphQLAidRequestDeleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestDeleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs';
import { GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs } from 'src/server/adapters/graphql/aid_request_action_option_api_args/subtypes/GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs';
import { AidRequestActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/AidRequestActionOptionPresenter';
import { AidRequestDeleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestDeleteActionOptionPresenter';
import { AidRequestMarkAsCompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsCompleteActionOptionPresenter';
import { AidRequestMarkAsIncompleteActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsIncompleteActionOptionPresenter';
import { AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter';
import { AidRequestMarkAsViewerWorkingOnItActionOptionPresenter } from 'src/server/presenters/public/aid_request_action_option/subtypes/AidRequestMarkAsViewerWorkingOnItActionOptionPresenter';

export class GraphQLAidRequestActionOptionAPIArgsFactory {
  public static create(
    option: AidRequestActionOptionPresenter,
  ): GraphQLAidRequestActionOptionAPIArgsProperties {
    // I would add a .getAPIArgs() method on AidRequestActionOptionPresenter,
    // but that would violate the dependency principle (code dependencies
    // should point towards higher level components).
    // So, I'm not sure how else to do this.
    if (option instanceof AidRequestDeleteActionOptionPresenter) {
      return new GraphQLAidRequestDeleteActionOptionAPIArgs();
    } else if (
      option instanceof AidRequestMarkAsIncompleteActionOptionPresenter
    ) {
      return new GraphQLAidRequestMarkAsIncompleteActionOptionAPIArgs();
    } else if (
      option instanceof AidRequestMarkAsCompleteActionOptionPresenter
    ) {
      return new GraphQLAidRequestMarkAsCompleteActionOptionAPIArgs();
    } else if (
      option instanceof
      AidRequestMarkAsViewerNotWorkingOnItActionOptionPresenter
    ) {
      return new GraphQLAidRequestMarkAsViewerNotWorkingOnItActionOptionAPIArgs();
    } else if (
      option instanceof AidRequestMarkAsViewerWorkingOnItActionOptionPresenter
    ) {
      return new GraphQLAidRequestMarkAsViewerWorkingOnItActionOptionAPIArgs();
    } else {
      throw new Error(
        'GraphQLAidRequestActionOptionAPIArgsFactory cannot handle this option type',
      );
    }
  }
}
