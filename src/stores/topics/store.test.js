beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('stores/topics/store', () => {
  let uut;
  const topic1 = {url: 'url1', title: 'bob'};
  const topic2 = {url: 'url2', title: 'michael'};

  beforeEach(() => {
    uut = require('./store');
  });

  it('initial state', () => {
    expect(uut.selectors.getAllTopics()).toEqual({});
    expect(uut.selectors.isLoading()).toEqual(true);
  });

  it('topicsFetched save topics', () => {
    uut.store.topicsFetched({a: 'a', b: 'b'});
    expect(uut.selectors.getAllTopics()).toEqual({a: 'a', b: 'b'});
  });

  it('topicsFetched sets loading to false', () => {
    uut.store.topicsFetched({a: 'a', b: 'b'});
    expect(uut.selectors.isLoading()).toEqual(false);
  });

  it('topicsFetched converts the topics into a map', () => {
    uut.store.topicsFetched([
      topic1,
      topic2,
    ]);
    expect(uut.selectors.getAllTopics()).toEqual({
      url1: topic1,
      url2: topic2
    });
  });

  it('getAllTopicUrls', () => {
    uut.store.topicsFetched([
      topic1,
      topic2,
    ]);
    expect(uut.selectors.getAllTopicsUrls()).toEqual(['url1', 'url2']);
  });

  it('holds selected topics', () => {
    uut.store.topicsFetched([
      topic1,
      topic2,
    ]);
    uut.store.selectTopicUrl('url2');
  });
});
