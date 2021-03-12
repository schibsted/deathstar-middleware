import { allowedToTamperWithRequest } from '../../src/middleware/validation';

const ctx = ({
  request: {
    url: '/foo/bar/baz',
    header: {
      blacklisted: 'foo',
      whitelisted: 'bar',
    },
  },
} as unknown) as any;

it('should allow tampering with all requests when there is no white or black list', () => {
  expect(allowedToTamperWithRequest(ctx, {})).toEqual(true);
});

it('should allow tampering with a whitelisted path when a path whitelist exists', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      whitelisted: {
        paths: ['/foo'],
      },
    }),
  ).toEqual(true);
});

it('should not allow tampering with a non-whitelisted path when a path whitelist exists', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      whitelisted: {
        paths: ['/i-am-not-whitelisted'],
      },
    }),
  ).toEqual(false);
});

it('should not allow tampering with a blacklisted path', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      blacklisted: {
        paths: ['/foo/bar'],
      },
    }),
  ).toEqual(false);
});

it('should allow tampering with a whitelisted header when a header whitelist exists', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      whitelisted: {
        headers: [
          {
            key: 'Whitelisted',
            value: 'bar',
          },
        ],
      },
    }),
  ).toEqual(true);
});

it('should not allow tampering with a non-whitelisted header when a header whitelist exists', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      whitelisted: {
        headers: [
          {
            key: 'foo',
            value: 'bar',
          },
        ],
      },
    }),
  ).toEqual(false);
});

it('should not allow tampering with a blacklisted header', () => {
  expect(
    allowedToTamperWithRequest(ctx, {
      blacklisted: {
        headers: [
          {
            key: 'blacklisted',
            value: 'foo',
          },
        ],
      },
    }),
  ).toEqual(false);
});
