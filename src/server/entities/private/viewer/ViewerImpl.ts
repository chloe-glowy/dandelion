import { CC } from 'src/server/context_container/public/ContextContainer';
import { IViewer } from 'src/server/entities/entities_domain/viewer/Viewer';
import { VC } from 'src/server/entities/private/vc/ViewerContext';
import { User } from 'src/server/entities/public/user/User';

export const ViewerImpl: IViewer = {
  getIsSystem(cc: CC): boolean {
    return cc.get(VC).vc.isSystem;
  },

  getUser(cc: CC): User | null {
    return cc.get(VC).vc.user;
  },
};
