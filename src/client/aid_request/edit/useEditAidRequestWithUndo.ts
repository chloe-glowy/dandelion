import { AidRequestActionInputInput } from 'src/../__generated__/globalTypes';
import { broadcastUpdatedAidRequest } from 'src/client/aid_request/cache/broadcastAidRequestUpdates';
import { EDIT_AID_REQUEST_MUTATION } from 'src/client/aid_request/edit/EditAidRequestMutation';
import {
  EditAidRequestMutation,
  EditAidRequestMutationVariables,
  EditAidRequestMutation_payload_object,
} from 'src/client/aid_request/edit/__generated__/editAidRequestMutation';
import { validate } from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import type { ReturnValues } from 'src/client/graphql/useMutateWithUndo';
import useMutateWithUndo from 'src/client/graphql/useMutateWithUndo';

type Args = {
  aidRequestID: string;
  clearInputs?: () => void;
  input?: AidRequestActionInputInput;
};

export default function useEditAidRequestWithUndo({
  aidRequestID,
  clearInputs,
  input,
}: Args): ReturnValues<EditAidRequestMutationVariables> {
  return useMutateWithUndo<
    EditAidRequestMutation_payload_object,
    EditAidRequestMutation,
    EditAidRequestMutationVariables
  >({
    broadcastResponse: (
      object: EditAidRequestMutation_payload_object | null,
    ) => {
      const validated = validate(object);
      broadcastUpdatedAidRequest(aidRequestID, validated);
    },
    clearInputs,
    mutation: EDIT_AID_REQUEST_MUTATION,
    variables:
      input == null
        ? undefined
        : {
            aidRequestID,
            input,
          },
  });
}
