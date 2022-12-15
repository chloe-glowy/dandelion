import { CC } from 'src/server/context_container/public/ContextContainer';
import { AidRequestCommentAction } from 'src/server/entities/public/aid_request_action/subtypes/comment/AidRequestCommentAction';
import { EditAidRequestSummarizer } from 'src/server/presenters/public/aid_request/edit_summary/EditAidRequestSummarizer';

export class EditAidRequestCommentSummarizer
  implements EditAidRequestSummarizer
{
  public constructor(
    private readonly cc: CC,
    private readonly action: AidRequestCommentAction,
  ) {}

  public async getSummary(): Promise<string> {
    return 'Added comment';
  }
}
