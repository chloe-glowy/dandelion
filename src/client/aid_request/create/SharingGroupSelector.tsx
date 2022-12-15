import * as React from 'react';
import { Pressable, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Text from 'src/client/components/Text';
import { findSharingGroup } from 'src/client/sharing_groups/findSharingGroup';
import { SharingGroupListItem } from 'src/client/viewer/ViewerTypes';

type Props = {
  sharingGroup: SharingGroupListItem | undefined;
  sharingGroups: ReadonlyArray<SharingGroupListItem>;
  setSharingGroup: (sharingGroup: SharingGroupListItem) => void;
};

export default function SharingGroupSelector({
  sharingGroup,
  sharingGroups,
  setSharingGroup,
}: Props): JSX.Element {
  return sharingGroups.length <= 1 ? (
    <></>
  ) : (
    <RadioButton.Group
      onValueChange={(id: string) => {
        setSharingGroup(findSharingGroup(id, sharingGroups));
      }}
      value={sharingGroup?.id ?? 'None'}
    >
      {sharingGroups.map((sharingGroup) => (
        <Pressable
          key={sharingGroup.id}
          onPress={() => setSharingGroup(sharingGroup)}
        >
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <RadioButton value={sharingGroup.id} />
            <Text>{sharingGroup.name}</Text>
          </View>
        </Pressable>
      ))}
    </RadioButton.Group>
  );
}
