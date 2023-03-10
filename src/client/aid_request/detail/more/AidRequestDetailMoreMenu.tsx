import * as React from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { AidRequestDetailsGraphQLType } from 'src/client/aid_request/detail/AidRequestDetailsGraphQLType';
import RequestExplorerNavigationStore from 'src/client/aid_request/explorer/navigation/RequestExplorerNavigationStore';
import Icon from 'src/client/components/Icon';
import useDrawerContext from 'src/client/drawer/useDrawerContext';
import AID_REQUEST_DETAIL_ID_URL_PARAM from 'src/shared/to_clean/urls/AID_REQUEST_DETAIL_ID_URL_PARAM';

type Props = {
  aidRequest: AidRequestDetailsGraphQLType;
};

type Item = 'Notification Settings';

export default function AidRequestDetailMoreMenu({
  aidRequest,
}: Props): JSX.Element {
  const { closeDrawer } = useDrawerContext();
  const actions: Array<Item> = ['Notification Settings'];

  return (
    <>
      <FlatList
        data={actions}
        keyExtractor={extractKey}
        renderItem={renderItem}
      />
    </>
  );

  function renderItem({
    item: action,
  }: ListRenderItemInfo<Item>): React.ReactElement {
    switch (action) {
      case 'Notification Settings':
        return (
          <List.Item
            left={() => <Icon path="more" />}
            onPress={() => {
              closeDrawer();
              const navigation = RequestExplorerNavigationStore.getValue();
              navigation?.push('AidRequestNotificationSettings', {
                [AID_REQUEST_DETAIL_ID_URL_PARAM]: aidRequest._id,
              });
            }}
            title={action}
          />
        );
    }
  }
}

function extractKey(item: Item): string {
  return item;
}
