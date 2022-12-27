import { CC } from 'src/server/context_container/public/ContextContainer';
import { ViewerImpl } from 'src/server/entities/private/viewer/ViewerImpl';
import { User } from 'src/server/entities/public/user/User';

export interface IViewer {
  getIsSystem(cc: CC): boolean;
  getUser(cc: CC): User | null;
}

export const Viewer: IViewer = ViewerImpl;
