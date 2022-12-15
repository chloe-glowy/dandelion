import type { LoadingType } from 'src/client/utils/loading/Loading';

export type LoggedInViewer = Readonly<{
  sharingGroups: ReadonlyArray<SharingGroupListItem>;
  displayName: string;
  id: string;
  username: string;
  taggableUsers: OtherUser[];
}>;

export type SharingGroupListItem = Readonly<{
  id: string;
  name: string;
}>;

export type OtherUser = {
  id: string;
  displayName: string;
};

export type LoggedOutViewer = undefined;

export type LoadingViewer = LoadingType;

export type Viewer = LoggedInViewer | LoggedOutViewer | LoadingViewer;
