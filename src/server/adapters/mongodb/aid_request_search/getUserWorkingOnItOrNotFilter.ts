import { PipelineStage } from 'mongoose';

export default function getUserWorkingOnItOrNotFilter(
  userID: string,
  isWorkingOn: boolean,
): PipelineStage[] {
  return [
    // // JS analogue of the following MongoDB aggregation:
    // Stage 1:
    // foreach (aidRequest in aidRequests) {
    //   aidRequest.iAmWorkingOnIt = 1 === size(
    //     setIntersection(
    //       viewerID,
    //       aidRequest.whoIsWorkingOnIt,
    //     )
    //   ) ? 1 : 0;
    // }
    // Stage 2:
    // aidRequests = aidRequests.filter(
    //   req => req.iAmWorkingOnIt === (isWorkingOn ? 1 : 0)
    // );
    {
      $addFields: {
        iAmWorkingOnIt: {
          $cond: [
            {
              $eq: [
                1,
                {
                  $size: {
                    $setIntersection: [[userID], '$whoIsWorkingOnIt'],
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
        iAmWorkingOnIt: isWorkingOn ? 1 : 0,
      },
    },
  ];
}
