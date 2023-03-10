import * as React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import { List, Paragraph, ProgressBar } from 'react-native-paper';
import { AidRequestHistoryEventType } from 'src/../__generated__/globalTypes';
import { broadcastUpdatedAidRequest } from 'src/client/aid_request/cache/broadcastAidRequestUpdates';
import { GoToRequestDetailScreen } from 'src/client/aid_request/detail/AidRequestDetailScreen';
import { isDraftID } from 'src/client/aid_request/drafts/AidRequestDraftIDs';
import { publishDraft } from 'src/client/aid_request/drafts/AidRequestDrafts';
import { EDIT_AID_REQUEST_MUTATION } from 'src/client/aid_request/edit/EditAidRequestMutation';
import type {
  AidRequestEditDrawerFragment,
  AidRequestEditDrawerFragment_actionsAvailable,
  AidRequestEditDrawerFragment_actionsAvailable_input,
} from 'src/client/aid_request/edit/__generated__/AidRequestEditDrawerFragment';
import {
  EditAidRequestMutation,
  EditAidRequestMutationVariables,
  EditAidRequestMutation_payload_object,
} from 'src/client/aid_request/edit/__generated__/editAidRequestMutation';
import { validate } from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import Icon from 'src/client/components/Icon';
import shouldDelete from 'src/client/dialog/shouldDelete';
import useDrawerContext from 'src/client/drawer/useDrawerContext';
import useMutateWithUndo from 'src/client/graphql/useMutateWithUndo';
import ToastStore from 'src/client/toast/ToastStore';
import filterNulls from 'src/shared/language_utils/filterNulls';

type Props = {
  aidRequest: AidRequestEditDrawerFragment;
  goToRequestDetailScreen?: GoToRequestDetailScreen;
};

type Item =
  | AidRequestEditDrawerFragment_actionsAvailable
  | 'View details'
  | 'Publish';

export default function AidRequestEditDrawer({
  aidRequest,
  goToRequestDetailScreen,
}: Props): JSX.Element {
  const [loadingPublish, setLoadingPublish] = React.useState<boolean>(false);
  const { closeDrawer } = useDrawerContext();
  const { actionsAvailable, _id: aidRequestID } = aidRequest;
  const actions = filterNulls(actionsAvailable ?? []);
  const { mutate, loading, error } = useMutateWithUndo<
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
    clearInputs: closeDrawer,
    mutation: EDIT_AID_REQUEST_MUTATION,
  });
  const extraActions: Array<Item> = [
    ...(goToRequestDetailScreen == null || isDraftID(aidRequest._id)
      ? []
      : (['View details'] as Array<Item>)),
    ...(isDraftID(aidRequest._id) ? (['Publish'] as Array<Item>) : []),
  ];

  return loading || loadingPublish ? (
    <ProgressBar indeterminate={true} />
  ) : (
    <>
      {error == null ? null : <Paragraph>{error.message}</Paragraph>}
      <FlatList
        data={[...actions, ...extraActions]}
        keyExtractor={extractKey}
        renderItem={renderItem}
      />
    </>
  );

  function renderItem({
    item: action,
  }: ListRenderItemInfo<Item>): React.ReactElement {
    if (action === 'View details') {
      return (
        <List.Item
          left={() => <Icon path="more" />}
          onPress={
            goToRequestDetailScreen == null
              ? undefined
              : () => {
                  closeDrawer();
                  goToRequestDetailScreen(aidRequest._id);
                }
          }
          title={action}
        />
      );
    }
    if (action === 'Publish') {
      return (
        <List.Item
          left={() => <Icon path="publish" />}
          onPress={async () => {
            setLoadingPublish(true);
            const message = await publishDraft(aidRequest._id);
            setLoadingPublish(false);
            closeDrawer();
            ToastStore.update({ message });
          }}
          title={action}
        />
      );
    }
    const { icon } = action;
    return (
      <List.Item
        left={() => <Icon path={icon} />}
        onPress={() => submit(action.input)}
        title={action.message}
      />
    );
  }

  async function submit(
    input: AidRequestEditDrawerFragment_actionsAvailable_input,
  ): Promise<void> {
    if (input.event === AidRequestHistoryEventType.Deleted) {
      const shouldContinue = await shouldDelete();
      if (!shouldContinue) {
        return;
      }
    }

    await mutate({
      aidRequestID,
      input: {
        action: input.action,
        event: input.event,
      },
    });
  }
}

function extractKey(item: Item): string {
  if (item === 'View details') {
    return 'View details';
  } else if (item === 'Publish') {
    return 'Publish';
  } else {
    return item.message;
  }
}
