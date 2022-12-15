import { User } from 'src/server/entities/public/user/User';

export interface AidRequestHistoryEventDBProxy {
  getID(): Promise<string>;
  getTimestamp(): Promise<Date>;
  getActor(): Promise<User | null>;
}
