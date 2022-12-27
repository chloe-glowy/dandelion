import { ContextContainerFactory } from 'src/server/context_container/public/ContextContainer';
import { RequestTime } from 'src/server/context_container/public/RequestTime';

describe('RequestTime', () => {
  it('throws if not initialized', () => {
    const cc = ContextContainerFactory.create();
    expect(() => RequestTime.get(cc)).toThrow();
  });

  it('throws if initialized twice', () => {
    const cc = ContextContainerFactory.create();
    cc.get(RequestTime).setRequestTime(new Date());
    expect(() => cc.get(RequestTime).setRequestTime(new Date())).toThrow();
  });

  it('returns the timestamp', () => {
    const cc = ContextContainerFactory.create();
    const timestamp = new Date('2020-01-01T00:00:00.000Z');
    cc.get(RequestTime).setRequestTime(timestamp);
    expect(RequestTime.get(cc)).toBe(timestamp);
  });
});
