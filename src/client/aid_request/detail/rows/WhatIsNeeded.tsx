import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  AidRequestHistoryEventType,
  AidRequestUpdateActionType,
} from 'src/../__generated__/globalTypes';
import Row from 'src/client/aid_request/detail/components/Row';
import useEditAidRequestWithUndo from 'src/client/aid_request/edit/useEditAidRequestWithUndo';
import InlineEditableText from 'src/client/components/InlineEditableText';

type Props = {
  aidRequestID: string;
  whatIsNeeded: string;
};

export default function WhatIsNeeded({
  aidRequestID,
  whatIsNeeded,
}: Props): JSX.Element {
  const { mutate } = useEditAidRequestWithUndo({
    aidRequestID,
  });

  return (
    <Row>
      <InlineEditableText
        save={save}
        style={styles.whatIsNeeded}
        value={whatIsNeeded}
      />
    </Row>
  );

  async function save(newValue: string): Promise<unknown> {
    return await mutate({
      aidRequestID,
      input: {
        action: AidRequestUpdateActionType.Add,
        event: AidRequestHistoryEventType.ChangedWhatIsNeeded,
        eventSpecificData: newValue,
      },
    });
  }
}

const styles = StyleSheet.create({
  whatIsNeeded: {
    fontSize: 20,
    lineHeight: 24,
  },
});
