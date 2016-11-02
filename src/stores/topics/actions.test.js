beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('stores/topics/actions', () => {
  let uut;
  const mockService = {
    getDefaultSubreddits: jest.fn()
  };
  const mockStore = {
    store: {
      topicsFetched: jest.fn()
    }
  };

  beforeEach(() => {
    jest.setMock('./../../services/reddit', mockService);
    jest.setMock('./store', mockStore);
    uut = require('./actions');
  });

  it('fetch posts calls the service', async() => {
    mockService.getDefaultSubreddits.mockReturnValue(['hello', 'world']);
    await uut.fetchPosts();
    expect(mockService.getDefaultSubreddits).toHaveBeenCalledTimes(1);
  });

  it('fetch posts calls the store when done', async() => {
    mockService.getDefaultSubreddits.mockReturnValue(['hello', 'world']);
    await uut.fetchPosts();
    expect(mockStore.store.topicsFetched).toHaveBeenCalledWith(['hello', 'world']);
  });

  it('fetch posts as a promise', async() => {
    mockService.getDefaultSubreddits.mockReturnValue(Promise.resolve('hello'));
    await uut.fetchPosts();
    expect(mockStore.store.topicsFetched).toHaveBeenCalledWith('hello');
  });
});
