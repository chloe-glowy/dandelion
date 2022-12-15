import * as React from 'react';
import Row from 'src/client/aid_request/detail/components/Row';
import RowTitle from 'src/client/aid_request/detail/components/RowTitle';
import { SharingGroupListItem } from 'src/client/viewer/ViewerTypes';
import CrewStrings from 'src/shared/to_clean/strings/CrewStrings';

type Props = {
  sharingGroup: SharingGroupListItem;
};

export default function SharingGroupInfo({ sharingGroup }: Props): JSX.Element {
  return (
    <Row
      divider={true}
      header={CrewStrings.userVisibleTitle}
      headerMonograms={[sharingGroup.name]}
    >
      <RowTitle>{sharingGroup.name}</RowTitle>
    </Row>
  );
}
