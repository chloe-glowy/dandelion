import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { broadcastManyNewAidRequests } from 'src/client/aid_request/cache/broadcastAidRequestUpdates';
import createAidRequestSaveToServer from 'src/client/aid_request/create/createAidRequestSaveToServer';
import {
  createNewAidRequestDraft,
  SuccessfulSaveData,
} from 'src/client/aid_request/drafts/AidRequestDrafts';
import FullScreenFormPageWithBigTitle from 'src/client/components/forms/FullScreenFormPageWithBigTitle';
import MultiTextInput from 'src/client/components/forms/multi_text_input/MultiTextInput';
import { RootStackScreenProps } from 'src/client/navigation/NavigationTypes';
import RootNavigationStore from 'src/client/navigation/root/RootNavigationStore';
import ToastStore from 'src/client/toast/ToastStore';
import RequireLoggedInScreen from 'src/client/viewer/RequireLoggedInScreen';
import { useLoggedInViewer } from 'src/client/viewer/Viewer';

export default function RecordMultiPersonRequestScreenPart2(
  props: RootStackScreenProps<'Record Multi Person Request Part 2'>,
): React.ReactElement {
  return (
    <RequireLoggedInScreen>
      <RecordMultiPersonRequestScreenPart2Impl {...props} />
    </RequireLoggedInScreen>
  );
}

function RecordMultiPersonRequestScreenPart2Impl(
  props: RootStackScreenProps<'Record Multi Person Request Part 2'>,
) {
  const { sharingGroupID, whatIsNeeded } = props.route.params;
  const viewer = useLoggedInViewer();

  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [whoIsItFor, setWhoIsItFor] = React.useState<string[]>([]);
  const areInputsValid = whoIsItFor.some(Boolean);

  return (
    <FullScreenFormPageWithBigTitle
      errorMessage={errorMessage}
      title={`Who needs ${whatIsNeeded}?`}
    >
      <View style={styles.element}>
        <MultiTextInput setValue={setWhoIsItFor} value={whoIsItFor} />
      </View>
      <View style={styles.element}>
        <View style={styles.buttonRow}>
          <Button
            disabled={!areInputsValid}
            loading={isLoading}
            mode="contained"
            onPress={submit}
          >
            Save
          </Button>
        </View>
      </View>
    </FullScreenFormPageWithBigTitle>
  );

  async function submit(): Promise<void> {
    ToastStore.update(undefined);
    setErrorMessage('');
    const variables = {
      sharingGroupID,
      whatIsNeeded: [whatIsNeeded],
      whoIsItForMulti: whoIsItFor,
    };
    setIsLoading(true);
    let data: null | SuccessfulSaveData = await createAidRequestSaveToServer(
      variables,
    );
    let isDraft = false;
    if (data == null) {
      isDraft = true;
      data = createNewAidRequestDraft(variables, viewer);
    }
    setIsLoading(false);
    if (data == null) {
      setErrorMessage('Unable to save. Please try again later');
      return;
    }
    const { postpublishSummary: message, aidRequests } = data;
    ToastStore.update({ message });
    if (!isDraft) {
      broadcastManyNewAidRequests(aidRequests);
    }
    pop();
  }

  function pop(): void {
    const rootNavigation = RootNavigationStore.getValue();
    rootNavigation?.popToTop();
    rootNavigation?.replace('Main');
  }
}

const styles = StyleSheet.create({
  bottomSpacer: { height: 8 },
  buttonRow: {
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  element: {
    marginHorizontal: 8,
  },
});
