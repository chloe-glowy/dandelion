import { initScriptEnvironment } from 'src/server/scripts/helpers/initScriptEnvironment';
import { getScriptOptions } from 'src/server/scripts/helpers/scriptOptions';
import { getAllCrewNames } from 'src/server/scripts/migrate-sharing-group-from-crew/helpers/getAllCrewNames';
import { getOrCreateSharingGroupsForCrews } from 'src/server/scripts/migrate-sharing-group-from-crew/helpers/getOrCreateSharingGroupsForCrews';
import { setSharingGroupIDsInAidRequests } from 'src/server/scripts/migrate-sharing-group-from-crew/helpers/setSharingGroupIDsInAidRequests';
import { setSharingGroupIDsInUsers } from 'src/server/scripts/migrate-sharing-group-from-crew/helpers/setSharingGroupIDsInUsers';

initScriptEnvironment();
const options = getScriptOptions();

async function migrateSharingGroupFromCrew(): Promise<number> {
  const allCrewNames = await getAllCrewNames();
  const crewNameToSharingGroupID = await getOrCreateSharingGroupsForCrews(
    allCrewNames,
    options,
  );

  await setSharingGroupIDsInAidRequests(crewNameToSharingGroupID, options);
  await setSharingGroupIDsInUsers(crewNameToSharingGroupID, options);

  return 0;
}

migrateSharingGroupFromCrew().then((returnValue: number) => {
  process.exit(returnValue);
});
