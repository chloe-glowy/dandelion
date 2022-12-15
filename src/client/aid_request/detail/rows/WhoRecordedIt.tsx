import * as React from 'react';
import Row from 'src/client/aid_request/detail/components/Row';
import RowTitle from 'src/client/aid_request/detail/components/RowTitle';

type Props = {
  displayName: string | undefined;
};

export default function WhoRecordedIt({ displayName }: Props): JSX.Element {
  return (
    <Row
      divider={true}
      header="Recorded by"
      headerMonograms={[displayName ?? 'Unknown']}
    >
      <RowTitle>{displayName ?? 'Unknown'}</RowTitle>
    </Row>
  );
}
