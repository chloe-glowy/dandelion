import { CC } from 'src/server/context_container/public/ContextContainer';
import { Viewer } from 'src/server/entities/domain/viewer/Viewer';
import { SharingGroup } from 'src/server/entities/public/sharing_group/SharingGroup';
import {
  GetAllSharingGroupsInteractorArgs,
  GetAllSharingGroupsInteractorResult,
} from 'src/server/interactors/sharing_group/get/types/GetAllSharingGroupsInteractorTypes';
import filterNulls from 'src/shared/language_utils/filterNulls';

export abstract class GetAllSharingGroupsInteractor {
  public static async execute(
    cc: CC,
    _args: GetAllSharingGroupsInteractorArgs,
  ): Promise<GetAllSharingGroupsInteractorResult> {
    const user = Viewer.getUser(cc);
    if (user == null) {
      throw new Error('Cannot call loadAllForViewer when not logged in');
    }
    const ids = await user.getSharingGroupIDs();
    const sharingGroups = filterNulls(
      await Promise.all(ids.map((id) => SharingGroup.load(cc, id))),
    );
    return { sharingGroups };
  }
}
