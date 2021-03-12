import { Deathstar } from '../../src/middleware';
import { sleep } from '../../src/middleware/utils';

jest.mock('../../src/middleware/utils', () => ({
  sleep: jest.fn(),
}));

const deathstar = new Deathstar(
  {
    accessKey: 'test',
    secretKey: 'test',
    region: 'test',
    bucket: 'test',
    key: 'test',
  },
  undefined,
);

it('should set status code and break the middleware chain', async () => {
  const next = jest.fn();
  const ctx = ({
    status: 200,
  } as unknown) as any;
  await deathstar.apply(ctx, next, {
    type: 'error',
    status: 567,
  });
  expect(ctx.status).toEqual(567);
  expect(next).toHaveBeenCalledTimes(0);
});

it('should sleep and then move to the next middleware', async () => {
  const next = jest.fn();
  const ctx = ({
    status: 200,
  } as unknown) as any;

  await deathstar.apply(ctx, next, {
    type: 'slow',
    timeout: 500,
  });
  expect(ctx.status).toEqual(200);
  expect(sleep).toHaveBeenCalledWith(500);
  expect(next).toHaveBeenCalledTimes(1);
});
