import * as React from 'react';
import * as FilterEncoder from 'src/client/aid_request/filter/FilterEncoder';
import RequestExplorerFilters from 'src/client/aid_request/filter/RequestExplorerFilters';
import RequestExplorerFiltersStore from 'src/client/aid_request/filter/RequestExplorerFiltersStore';
import { useRequestExplorerFilters } from 'src/client/aid_request/filter/useRequestExplorerFilters';
import useListOfAidRequestItems from 'src/client/aid_request/list/useListOfAidRequestItems';
import { RequestExplorerStackScreenProps } from 'src/client/navigation/NavigationTypes';
import ScrollableScreen from 'src/client/scrollable_screen/ScrollableScreen';
import singleElement from 'src/client/scrollable_screen/singleElement';
import AID_REQUEST_DETAIL_ID_URL_PARAM from 'src/shared/to_clean/urls/AID_REQUEST_DETAIL_ID_URL_PARAM';

export default function RequestExplorerScreen({
  navigation,
  route,
}: RequestExplorerStackScreenProps<'RequestExplorer'>): JSX.Element {
  React.useEffect(() => {
    RequestExplorerFiltersStore.update(FilterEncoder.decode(route.params?.f));
  }, []);
  const filter = useRequestExplorerFilters();
  React.useEffect(() => {
    if (filter == null) {
      return;
    }
    const encoded = FilterEncoder.encode(filter);
    if (encoded !== route.params?.f) {
      navigation.replace('RequestExplorer', { f: encoded });
    }
  }, [filter]);
  const listOfAidRequests = useListOfAidRequestItems({
    filter: filter ?? FilterEncoder.decode(route.params?.f),
    goToRequestDetailScreen,
  });

  return (
    <ScrollableScreen
      configs={[
        singleElement({
          key: 'RequestExplorerFilters',
          render: () => <RequestExplorerFilters />,
        }),
        listOfAidRequests,
      ]}
    />
  );

  function goToRequestDetailScreen(aidRequestID: string): void {
    navigation.push('AidRequestDetail', {
      [AID_REQUEST_DETAIL_ID_URL_PARAM]: aidRequestID,
    });
  }
}
