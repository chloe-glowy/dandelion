import { ContextContainerFactoryImpl } from 'src/server/context_container/private/ContextContainerFactoryImpl';
import { testCatch } from 'src/server/tests/application/helpers/testCatch';

describe('ContextContainerFactoryImpl', () => {
  it('Fails if an incorrect token is passed', async () => {
    const token = 3;
    const ex = await testCatch(async () => {
      ContextContainerFactoryImpl.assertConstructedByContextContainer(token);
    });
    expect(ex).toBeDefined();
  });
});
