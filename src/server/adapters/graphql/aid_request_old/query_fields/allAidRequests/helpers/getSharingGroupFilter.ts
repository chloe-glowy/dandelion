// eslint-disable-next-line @chloeglowy/restrict-imports/restrict-import-folders
import { PipelineStage } from 'mongoose';

export default function getCrewFilter(user: Express.User): PipelineStage[] {
  return [
    // // JS analogue of the following MongoDB aggregation:
    // Stage 1:
    // foreach (aidRequest in aidRequests) {
    //   aidRequest.isInOneOfMySharingGroups = 1 === size(
    //     setIntersection(
    //       user.sharingGroups,
    //       aidRequest.sharingGroup,
    //     )
    //   ) ? 1 : 0;
    // }
    // Stage 2:
    // aidRequests = aidRequests.filter(
    //   a => a.isInOneOfMySharingGroups === 1
    // );
    {
      $addFields: {
        isInOneOfMySharingGroups: {
          $cond: [
            {
              $eq: [
                1,
                {
                  $size: {
                    $setIntersection: [user.sharingGroups, ['$sharingGroup']],
                  },
                },
              ],
            },
            1,
            0,
          ],
        },
      },
    },
    {
      $match: {
        isInOneOfMySharingGroups: 1,
      },
    },
  ];
}
