import { selectRequest } from './RequestSelector';

let store: any;

beforeEach(() => {
  store = {
    request: {
      ['SomeAction.REQUEST_TEST']: true,
    },
  };
});

describe('selectRequest', () => {
  it('should return true', () => {
    const received: boolean = selectRequest(store, ['SomeAction.REQUEST_TEST']);

    expect(received).toBe(true);
  });

  it('should return false', () => {
    const received: boolean = selectRequest(store, ['SomeAction.REQUEST_OTHER']);

    expect(received).toBe(false);
  });
});
