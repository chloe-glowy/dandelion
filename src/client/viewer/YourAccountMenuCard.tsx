import { gql } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, ProgressBar } from 'react-native-paper';
import StyledCard from 'src/client/components/Card';
import ErrorNotice from 'src/client/components/ErrorNotice';
import InlineEditableText from 'src/client/components/InlineEditableText';
import Text from 'src/client/components/Text';
import resetCache from 'src/client/graphql/resetCache';
import useMutateWithToast from 'src/client/graphql/useMutateWithToast';
import LogoutAction from 'src/client/viewer/LogoutAction';
import { useLoggedInViewer } from 'src/client/viewer/Viewer';
import {
  ChangeNameMutation,
  ChangeNameMutationVariables,
} from 'src/client/viewer/__generated__/ChangeNameMutation';

export default function YourAccountMenuCard(): React.ReactElement {
  const viewer = useLoggedInViewer();
  const { mutate, loading, error } = useMutateWithToast<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >({
    errorMessage: 'Unable to update your name',
    mutation: CHANGE_NAME_MUTATION,
    onSuccess: resetCache,
    successMessage: 'Successfully updated your name',
  });
  return (
    <StyledCard>
      <Card.Title title="Your Account" />
      <ProgressBar indeterminate={true} visible={loading} />
      <Card.Content>
        <Text style={styles.fieldHeader}>Name</Text>
        <InlineEditableText
          save={save}
          style={styles.rowTitle}
          value={viewer.displayName}
        />
        <ErrorNotice
          error={error}
          manualChange={`Change name to ${viewer.displayName}`}
          whenTryingToDoWhat="change your name"
        />
        <View style={{ height: 8 }} />
        <Text style={styles.fieldHeader}>Email Address</Text>
        <Paragraph>{viewer.username}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <LogoutAction />
      </Card.Actions>
    </StyledCard>
  );

  async function save(displayName: string): Promise<void> {
    if (displayName) {
      await mutate({ displayName });
    }
  }
}

export const CHANGE_NAME_MUTATION = gql`
  mutation ChangeNameMutation($displayName: String!) {
    payload: changeName(displayName: $displayName) {
      _id
      displayName
    }
  }
`;

const styles = StyleSheet.create({
  fieldHeader: {
    fontSize: 12,
    opacity: 0.6,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
