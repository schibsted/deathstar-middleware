import { sleep } from '../../src/middleware/utils';

it('should sleep for x milliseconds', () => {
  jest.useFakeTimers();
  sleep(1000);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
