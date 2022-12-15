import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import SharingGroupSelector from 'src/client/aid_request/create/SharingGroupSelector';
import FullScreenFormPageWithBigTitle from 'src/client/components/forms/FullScreenFormPageWithBigTitle';
import TextInput from 'src/client/components/TextInput';
import RootNavigationStore from 'src/client/navigation/root/RootNavigationStore';
import RequireLoggedInScreen from 'src/client/viewer/RequireLoggedInScreen';
import { useLoggedInViewer } from 'src/client/viewer/Viewer';
import { SharingGroupListItem } from 'src/client/viewer/ViewerTypes';

export default function RecordAidRequestScreen(): React.ReactElement {
  return (
    <RequireLoggedInScreen>
      <RecordMultiPersonRequestScreenImpl />
    </RequireLoggedInScreen>
  );
}

function RecordMultiPersonRequestScreenImpl() {
  const { sharingGroups } = useLoggedInViewer();
  const [whatIsNeeded, setWhatIsNeeded] = React.useState<string>('');
  const [sharingGroup, setSharingGroup] = React.useState<
    SharingGroupListItem | undefined
  >(sharingGroups[0]);
  const areInputsValid = !!whatIsNeeded.length;

  return (
    <FullScreenFormPageWithBigTitle title="What is needed?">
      <View style={styles.element}>
        <SharingGroupSelector
          setSharingGroup={setSharingGroup}
          sharingGroup={sharingGroup}
          sharingGroups={sharingGroups}
        />
      </View>
      <View style={styles.element}>
        <TextInput
          autoComplete="off"
          autoFocus={true}
          label=""
          mode="flat"
          onSubmitEditing={submit}
          returnKeyType="go"
          setValue={setWhatIsNeeded}
          value={whatIsNeeded}
        />
      </View>
      <View style={styles.element}>
        <View style={styles.buttonRow}>
          <Button disabled={!areInputsValid} mode="contained" onPress={submit}>
            Next
          </Button>
        </View>
      </View>
    </FullScreenFormPageWithBigTitle>
  );

  async function submit(): Promise<void> {
    RootNavigationStore.getValue()?.push('Record Multi Person Request Part 2', {
      sharingGroupID: sharingGroup?.id ?? '',
      whatIsNeeded,
    });
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
