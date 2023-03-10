import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useColor } from 'src/client/aid_request/../components/Colors';
import { GoToRequestDetailScreen } from 'src/client/aid_request/detail/AidRequestDetailScreen';
import { isDraftID } from 'src/client/aid_request/drafts/AidRequestDraftIDs';
import RetryPublishing, {
  PublishCallback,
} from 'src/client/aid_request/drafts/RetryPublishing';
import AidRequestEditDrawer from 'src/client/aid_request/edit/AidRequestEditDrawer';
import { AidRequestGraphQLType } from 'src/client/aid_request/fragments/AidRequestGraphQLType';
import DrawerButton from 'src/client/components/DrawerButton';
import PressableText from 'src/client/components/PressableText';
import Text from 'src/client/components/Text';
import { useLoggedInViewer } from 'src/client/viewer/Viewer';

type Props = {
  aidRequest: AidRequestGraphQLType;
  goToRequestDetailScreen?: GoToRequestDetailScreen;
};

export default function AidRequestCard({
  aidRequest,
  goToRequestDetailScreen,
}: Props): JSX.Element {
  const viewer = useLoggedInViewer();
  const { whatIsNeeded, whoIsItFor } = aidRequest;
  const retryPublishingRef = React.useRef<PublishCallback | null>(null);
  const nonDraftColor = useColor('cardBackground');
  const draftColor = useColor('draftCardColor');
  const isDraft = isDraftID(aidRequest._id);

  const backgroundColor = isDraft ? draftColor : nonDraftColor;

  const suffix =
    Array.isArray(viewer.sharingGroups) && viewer.sharingGroups.length > 1
      ? ` (${aidRequest.sharingGroup.name})`
      : null;

  return (
    <Pressable onPress={onPressOnCard}>
      <View style={[styles.card, { backgroundColor }]}>
        <View
          style={{
            alignSelf: 'stretch',
            flexBasis: '93%',
            flexDirection: 'column',
            flexGrow: 0,
            flexShrink: 1,
          }}
        >
          <Text numberOfLines={2}>{whatIsNeeded}</Text>
          <View style={styles.row}>
            <Text style={{ fontSize: 12 }}>
              for <Text style={{ fontWeight: 'bold' }}>{whoIsItFor}</Text>
              {suffix}
            </Text>
          </View>
          <View style={[styles.row, styles.bottomRow]}>
            <PressableText>{aidRequest.latestEvent}</PressableText>
            {isDraft ? (
              <RetryPublishing
                aidRequest={aidRequest}
                ref={(ref) => {
                  retryPublishingRef.current = ref;
                }}
              />
            ) : null}
          </View>
        </View>
        <View style={{ flexBasis: '1%', flexGrow: 1 }}>
          <DrawerButton
            iconSize={24}
            renderDrawerContents={renderEditDrawerContents}
          />
        </View>
      </View>
    </Pressable>
  );

  function onPressOnCard(): void {
    if (isDraft) {
      retryPublishingRef.current?.publish();
    } else {
      goToRequestDetailScreen?.(aidRequest._id);
    }
  }

  function renderEditDrawerContents(): React.ReactElement {
    return (
      <AidRequestEditDrawer
        aidRequest={aidRequest}
        goToRequestDetailScreen={goToRequestDetailScreen}
      />
    );
  }
}

const styles = StyleSheet.create({
  bottomRow: {
    height: 26,
    paddingTop: 4,
  },
  card: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    elevation: 8,
    flexDirection: 'row',
    maxWidth: '100%',
    paddingLeft: 8,
    paddingVertical: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
});
