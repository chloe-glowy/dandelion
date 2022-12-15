import * as React from 'react';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import StyledCard from 'src/client/components/Card';
import { useLoggedInViewer } from 'src/client/viewer/Viewer';

export default function YourAccountMenuCard(): React.ReactElement {
  const { sharingGroups } = useLoggedInViewer();
  return (
    <StyledCard>
      <Card.Title title="Sharing Groups" />
      <Card.Content>
        <FlatList
          data={sharingGroups}
          keyExtractor={(sharingGroup) => sharingGroup.id}
          renderItem={({ item: sharingGroup }) => {
            return <Paragraph>{sharingGroup.name}</Paragraph>;
          }}
        />
      </Card.Content>
    </StyledCard>
  );
}
