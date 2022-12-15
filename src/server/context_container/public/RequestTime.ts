import {
  CC,
  ContextModule,
} from 'src/server/context_container/public/ContextContainer';

export class RequestTime extends ContextModule {
  public static get(cc: CC): Date {
    return cc.get(this).timestamp;
  }

  private timestamp_: Date | undefined;

  private get timestamp(): Date {
    if (this.timestamp_ == null) {
      throw new Error('Expected timestamp to be set');
    }
    return this.timestamp_;
  }

  public setRequestTime(timestamp: Date): void {
    if (this.timestamp_ != null) {
      throw new Error('Attempted to set request time twice');
    }
    this.timestamp_ = timestamp;
  }
}
