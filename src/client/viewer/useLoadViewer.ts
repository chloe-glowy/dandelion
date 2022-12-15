import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import Loading from 'src/client/utils/loading/Loading';
import { ViewerStore } from 'src/client/viewer/Viewer';
import type { Viewer } from 'src/client/viewer/ViewerTypes';
import type { ViewerQuery } from 'src/client/viewer/__generated__/ViewerQuery';

const VIEWER_QUERY = gql`
  query ViewerQuery {
    me {
      _id
      username
      displayName
      sharingGroups {
        id: _id
        name
      }
      taggableUsers {
        id: _id
        displayName
      }
    }
  }
`;

export default function useLoadViewer(): void {
  const { data, loading } = useQuery<ViewerQuery>(VIEWER_QUERY);
  const username = data?.me?.username;
  const id = data?.me?._id;
  const displayName = data?.me?.displayName || username;
  const sharingGroups = data?.me?.sharingGroups ?? [];
  const viewer = React.useMemo((): Viewer => {
    if (loading) {
      return Loading;
    } else if (username == null || id == null || displayName == null) {
      return undefined;
    } else {
      return {
        displayName,
        id,
        sharingGroups,
        taggableUsers: data?.me?.taggableUsers ?? [],
        username,
      };
    }
  }, [username, loading, id, sharingGroups]);
  React.useEffect(() => {
    ViewerStore.update(viewer);
  }, [viewer]);
}
