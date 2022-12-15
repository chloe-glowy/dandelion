import { GraphQLCreateAidRequestInputArgsType } from 'src/server/adapters/graphql/create_aid_requests/types/GraphQLCreateAidRequestInputTypes';
import { CreateAidRequestsControllerArgs } from 'src/server/controllers/create_aid_requests/types/CreateAidRequestsControllerTypes';

export abstract class GraphQLCreateAidRequestsArgsAdapter {
  public static fromGraphQLArgs({
    sharingGroupID,
    whatIsNeeded,
    whoIsItFor,
    whoIsItForMulti,
  }: GraphQLCreateAidRequestInputArgsType): CreateAidRequestsControllerArgs {
    return {
      sharingGroupID,
      whatIsNeeded,
      whoIsItFor: this.resolveWhoIsItFor({
        whoIsItForMulti,
        whoIsItForSingle: whoIsItFor,
      }),
    };
  }

  private static resolveWhoIsItFor({
    whoIsItForSingle,
    whoIsItForMulti,
  }: {
    whoIsItForSingle: string | undefined | null;
    whoIsItForMulti: string[] | undefined | null;
  }): string[] {
    if (whoIsItForMulti != null) {
      return whoIsItForMulti;
    } else if (whoIsItForSingle != null) {
      return [whoIsItForSingle];
    } else {
      throw new Error(
        'Must provide either whoIsItFor or whoIsItForMulti to createAidRequests',
      );
    }
  }
}
