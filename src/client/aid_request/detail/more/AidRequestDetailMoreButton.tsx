import * as React from 'react';
import { AidRequestDetailsGraphQLType } from 'src/client/aid_request/detail/AidRequestDetailsGraphQLType';
import AidRequestDetailMoreMenu from 'src/client/aid_request/detail/more/AidRequestDetailMoreMenu';
import DrawerButton from 'src/client/components/DrawerButton';

type Props = {
  aidRequest: AidRequestDetailsGraphQLType;
};

export default function ShareAidRequestButton({
  aidRequest,
}: Props): JSX.Element | null {
  return (
    <DrawerButton iconSize={32} renderDrawerContents={renderDrawerContents} />
  );

  function renderDrawerContents(): React.ReactElement {
    return <AidRequestDetailMoreMenu aidRequest={aidRequest} />;
  }
}
