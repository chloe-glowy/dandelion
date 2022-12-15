import forEachAidRequest from 'src/server/scripts/helpers/for-each-aid-request';
import forEachUser from 'src/server/scripts/helpers/for-each-user';

export async function getAllCrewNames(): Promise<Array<string>> {
  const ALL_CREW_NAMES = new Set<string>();

  await forEachAidRequest(async (aidRequest): Promise<void> => {
    const { crew } = aidRequest;
    if (crew != null) {
      ALL_CREW_NAMES.add(crew);
    }
  });

  await forEachUser(async (user): Promise<void> => {
    user.crews.forEach((crew): void => {
      ALL_CREW_NAMES.add(crew);
    });
  });

  return Array.from(ALL_CREW_NAMES).sort((a, b) => (a > b ? 1 : -1));
}
