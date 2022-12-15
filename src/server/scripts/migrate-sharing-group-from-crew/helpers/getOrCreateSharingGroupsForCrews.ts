import { ObjectId } from 'mongodb';
import { ScriptOptionsType } from 'src/server/scripts/helpers/scriptOptions';
import { getOrCreateSharingGroupForCrew } from 'src/server/scripts/migrate-sharing-group-from-crew/helpers/getOrCreateSharingGroupForCrew';

export async function getOrCreateSharingGroupsForCrews(
  crewNames: ReadonlyArray<string>,
  options: ScriptOptionsType,
): Promise<Map<string, ObjectId>> {
  const crewNameToSharingGroupID: Map<string, ObjectId> = new Map();
  for (let i = 0; i < crewNames.length; i++) {
    const crewName = crewNames[i];
    const objectId = await getOrCreateSharingGroupForCrew(crewName, options);
    if (objectId !== undefined) {
      crewNameToSharingGroupID.set(crewName, objectId);
    } else {
      if (!options.isDryRun) {
        throw new Error('Failed to create sharing group for crew ' + crewName);
      }
    }
  }
  return crewNameToSharingGroupID;
}
