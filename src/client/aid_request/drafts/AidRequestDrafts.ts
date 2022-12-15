import { ExecutionResult } from 'graphql';
import { broadcastManyNewAidRequests } from 'src/client/aid_request/cache/broadcastAidRequestUpdates';
import createAidRequestSaveToServer from 'src/client/aid_request/create/createAidRequestSaveToServer';
import { CreateAidRequestsMutationVariables } from 'src/client/aid_request/create/__generated__/CreateAidRequestsMutation';
import { createDraftID } from 'src/client/aid_request/drafts/AidRequestDraftIDs';
import {
  graphqlNodeDraftStore,
  setDrafts,
  storageDraftStore,
} from 'src/client/aid_request/drafts/AidRequestDraftsMemoryStore';
import {
  getSavedValuesFromStorage,
  StorageEntry,
} from 'src/client/aid_request/drafts/AidRequestDraftsPersistentStorage';
import { AidRequestGraphQLType } from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import { findSharingGroup } from 'src/client/sharing_groups/findSharingGroup';
import { LoggedInViewer } from 'src/client/viewer/ViewerTypes';
import flatten from 'src/shared/language_utils/flatten';
import resolveWhoIsItFor from 'src/shared/to_clean/utils/resolveWhoIsItFor';

export type SuccessfulSaveData = {
  postpublishSummary: string;
  aidRequests: AidRequestGraphQLType[];
  errors: ExecutionResult['errors'];
};

export function createNewAidRequestDraft(
  variables: CreateAidRequestsMutationVariables,
  viewer: LoggedInViewer,
): null | SuccessfulSaveData {
  try {
    const oldValues = storageDraftStore.getValue();
    const newValues = createNewStorageValues(variables, viewer);
    setDrafts(oldValues.concat(newValues));
    return {
      aidRequests: graphqlNodeDraftStore.getValue(),
      errors: undefined,
      postpublishSummary: `Network unavailable. Saved draft${
        newValues.length === 1 ? '' : 's'
      } to device`,
    };
  } catch {
    return null;
  }
}

export function deleteAidRequestDraft(aidRequestID: string): void {
  try {
    const oldValues = storageDraftStore.getValue();
    const newValues = oldValues.filter(({ tempID }) => tempID !== aidRequestID);
    setDrafts(newValues);
  } catch {
    return;
  }
}

function createNewStorageValues(
  {
    sharingGroupID,
    whatIsNeeded: whatAllIsNeeded,
    whoIsItFor: whoIsItForSingle,
    whoIsItForMulti,
  }: CreateAidRequestsMutationVariables,
  { sharingGroups }: LoggedInViewer,
): Array<StorageEntry> {
  const whoAllIsItFor = resolveWhoIsItFor({
    whoIsItForMulti,
    whoIsItForSingle,
  });
  return flatten(
    whoAllIsItFor.map((whoIsItFor: string) =>
      whatAllIsNeeded.map(
        (whatIsNeeded: string): StorageEntry => ({
          sharingGroup: findSharingGroup(sharingGroupID, sharingGroups),
          tempID: createDraftID(),
          whatIsNeeded,
          whoIsItFor,
        }),
      ),
    ),
  );
}

export async function publishDraft(id: string): Promise<string> {
  const oldValues = await getSavedValuesFromStorage();
  const valueToSaves = oldValues.filter(({ tempID }) => tempID === id);
  if (valueToSaves.length === 0) {
    return 'Draft data not found';
  }
  if (valueToSaves.length > 1) {
    console.error(
      'Multiple drafts found with the same ID.',
      valueToSaves,
      oldValues,
    );
  }
  const valueToSave = valueToSaves[0];
  const { sharingGroup, whoIsItFor, whatIsNeeded } = valueToSave;
  const data: null | SuccessfulSaveData = await createAidRequestSaveToServer({
    sharingGroupID: sharingGroup.id,
    whatIsNeeded: [whatIsNeeded],
    whoIsItFor,
  });
  if (data == null) {
    return 'Failed to publish';
  }
  deleteAidRequestDraft(id);
  const { postpublishSummary, aidRequests } = data;
  broadcastManyNewAidRequests(aidRequests);
  return postpublishSummary;
}
