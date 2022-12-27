import { ContextContainerFactoryImpl } from 'src/server/context_container/private/ContextContainerFactoryImpl';

describe('ContextContainerFactoryImpl', () => {
  it('Fails if an incorrect token is passed', () => {
    const token = 3;
    let ex: Error | undefined;
    try {
      ContextContainerFactoryImpl.assertConstructedByContextContainer(token);
    } catch (e) {
      if (e instanceof Error) {
        ex = e;
      }
    }
    expect(ex).toBeDefined();
  });
});
