import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Card, List } from 'react-native-paper';
import StyledCard from 'src/client/components/Card';
import Icon from 'src/client/components/Icon';
import PressableText from 'src/client/components/PressableText';
import {
  AttributionCardQuery,
  AttributionCardQuery_attributions,
} from 'src/client/menu/attribution/__generated__/AttributionCardQuery';
import filterNulls from 'src/shared/language_utils/filterNulls';

export default function AttributionCard(): JSX.Element {
  const { data } = useQuery<AttributionCardQuery>(ATTRIBUTION_CARD_QUERY);
  const attributions = filterNulls(data?.attributions ?? []);
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <StyledCard>
      <Card.Title title="Icon Attributions" />
      <Card.Content>
        <PressableText onPress={() => setShow((show) => !show)}>
          {show ? 'Hide' : 'Show'}
        </PressableText>
        {show ? (
          <FlatList
            data={attributions}
            keyExtractor={({ icon }) => icon}
            renderItem={renderItem}
          />
        ) : null}
      </Card.Content>
    </StyledCard>
  );

  function renderItem({
    item,
  }: ListRenderItemInfo<AttributionCardQuery_attributions>): React.ReactElement {
    const { icon, text } = item;
    return (
      <List.Item
        description={text}
        left={() => <Icon path={icon} />}
        title={text}
      />
    );
  }
}

export const ATTRIBUTION_CARD_QUERY = gql`
  query AttributionCardQuery {
    attributions {
      icon
      text
    }
  }
`;
