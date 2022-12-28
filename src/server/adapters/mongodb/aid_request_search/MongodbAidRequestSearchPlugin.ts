import { PipelineStage } from 'mongoose';
import { MongodbAidRequest } from 'src/server/adapters/mongodb/aid_request/types/MongodbAidRequest';
import { getSharingGroupFilter } from 'src/server/adapters/mongodb/aid_request_search/getSharingGroupFilter';
import getUserWorkingOnItOrNotFilter from 'src/server/adapters/mongodb/aid_request_search/getUserWorkingOnItOrNotFilter';
import { mongodbAidRequestSearchExecSearchInternalRaw } from 'src/server/adapters/mongodb/aid_request_search/mongodbAidRequestSearchExecSearchInternalRaw';
import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { User } from 'src/server/entities/public/user/User';
import {
  AidRequestSearchBuilder,
  AidRequestSearchPluginType,
} from 'src/server/interactors/search_aid_requests/plugin/AidRequestSearchPluginType';
import { AidRequestSearchInteractorResult } from 'src/server/interactors/search_aid_requests/types/AidRequestSearchInteractorTypes';
import filterNulls from 'src/shared/language_utils/filterNulls';

export class MongodbAidRequestSearchPlugin
  implements AidRequestSearchPluginType
{
  constructor(private readonly searchIndexName: string) {}

  create(cc: CC): AidRequestSearchBuilder {
    return new MongodbAidRequestSearchBuilder(cc, this.searchIndexName);
  }
}

class MongodbAidRequestSearchBuilder implements AidRequestSearchBuilder {
  readonly searchFilters: Array<PipelineStage> = [];
  readonly nonSearchFilters: Array<PipelineStage> = [];
  resultCount: number | undefined;
  skipCount: number | undefined;

  constructor(
    private readonly cc: CC,
    private readonly searchIndexName: string,
  ) {}

  public async limitToRequestsUserHasPermissionToSee(
    user: User,
  ): Promise<AidRequestSearchBuilder> {
    let sharingGroupIDs: ReadonlyArray<string> = [];
    if (user != null) {
      sharingGroupIDs = await user.getSharingGroupIDs();
    }
    this.nonSearchFilters.push(...getSharingGroupFilter(sharingGroupIDs));
    return this;
  }

  public async limitToCompletedRequests(): Promise<AidRequestSearchBuilder> {
    this.nonSearchFilters.push({
      $match: {
        completed: true,
      },
    });
    return this;
  }

  public async limitToIncompleteRequests(): Promise<AidRequestSearchBuilder> {
    this.nonSearchFilters.push({
      $match: {
        completed: false,
      },
    });
    return this;
  }

  public async limitToRequestsUserIsWorkingOn(
    user: User,
  ): Promise<AidRequestSearchBuilder> {
    return this.limitToRequestsWhereViewerWorkingOnIs(user, true);
  }

  public async limitToRequestsUserIsNotWorkingOn(
    user: User,
  ): Promise<AidRequestSearchBuilder> {
    return await this.limitToRequestsWhereViewerWorkingOnIs(user, false);
  }

  private async limitToRequestsWhereViewerWorkingOnIs(
    user: User,
    isWorkingOn: boolean,
  ): Promise<AidRequestSearchBuilder> {
    const userID = await user.getID();
    this.nonSearchFilters.push(
      ...getUserWorkingOnItOrNotFilter(userID, isWorkingOn),
    );
    return this;
  }

  public async setResultCount(count: number): Promise<AidRequestSearchBuilder> {
    this.resultCount = count;
    return this;
  }

  public async setSearchText(text: string): Promise<AidRequestSearchBuilder> {
    if (text) {
      this.searchFilters.push({
        $search: {
          index: this.searchIndexName,
          text: {
            path: {
              wildcard: '*',
            },
            query: text,
          },
        },
      });
    }
    return this;
  }

  public async setSkipFirst(count: number): Promise<AidRequestSearchBuilder> {
    this.skipCount = count;
    return this;
  }

  public async execute(): Promise<AidRequestSearchInteractorResult> {
    const { skipCount, resultCount } = this;
    if (skipCount === undefined) {
      throw new Error(
        'MongodbAidRequestSearchimplementation: skipCount is undefined',
      );
    }
    if (resultCount === undefined) {
      throw new Error(
        'MongodbAidRequestSearchimplementation: resultCount is undefined',
      );
    }

    // Mongodb requires that the $search stage be the first stage in the pipeline.
    const filters = [...this.searchFilters, ...this.nonSearchFilters];

    const result = await mongodbAidRequestSearchExecSearchInternalRaw({
      filters,
      resultCount,
      skipCount,
    });

    const { data, total } = result;
    const maybeAidRequests = await Promise.all(
      data.map(async (node: MongodbAidRequest): Promise<AidRequest | null> => {
        return await AidRequest.load(this.cc, node._id.toString());
      }),
    );
    const aidRequests = filterNulls(maybeAidRequests);

    const nextSkipFirst = skipCount + data.length;
    const hasMore = total > nextSkipFirst;

    return {
      aidRequests,
      hasMore,
      nextSkipFirst,
    };
  }
}
