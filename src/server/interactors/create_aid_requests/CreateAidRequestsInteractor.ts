import { CC } from 'src/server/context_container/public/ContextContainer';
import { RequestTime } from 'src/server/context_container/public/RequestTime';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { AidRequest } from 'src/server/entities/public/aid_request/AidRequest';
import { AidRequestCreatedAction } from 'src/server/entities/public/aid_request_action/subtypes/created/AidRequestCreatedAction';
import { AidRequestActionWithContext } from 'src/server/entities/public/aid_request_action_with_context/AidRequestActionWithContext';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import {
  CreateAidRequestsInteractorArgs,
  CreateAidRequestsInteractorResult,
} from 'src/server/interactors/create_aid_requests/types/CreateAidRequestsInteractorTypes';
import flatten from 'src/shared/language_utils/flatten';

export abstract class CreateAidRequestsInteractor {
  public static async execute(
    cc: CC,
    args: CreateAidRequestsInteractorArgs,
  ): Promise<CreateAidRequestsInteractorResult> {
    const user = Viewer.getUser(cc);
    if (user == null) {
      throw new Error('User must be logged in to create aid requests');
    }
    const actorID = await user.getID();
    const createdAt = RequestTime.get(cc);

    const creationEvent = new AidRequestActionWithContext(
      new AidRequestCreatedAction(),
      actorID,
      createdAt,
    );

    const sharingGroup = await SharingGroup.load(cc, args.sharingGroupID);
    if (sharingGroup == null) {
      throw new Error('Sharing group not found');
    }

    const aidRequests = await Promise.all(
      flatten(
        args.whoIsItFor.map((whoIsItFor) =>
          args.whatIsNeeded.map((whatIsNeeded) => {
            return AidRequest.create(cc, {
              completed: false,
              createdAt,
              history: [creationEvent],
              sharingGroup,
              whatIsNeeded,
              whoIsItFor,
              whoIsWorkingOnIt: [],
              whoRecordedIt: user,
            });
          }),
        ),
      ),
    );
    return { aidRequests };
  }
}
