beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('stores/topics/store', () => {
  let uut;

  beforeEach(() => {
    uut = require('./store');
  });

  it('holds all topics', () => {
    uut.store.topicsFetched(['a', 'b']);
    expect(uut.selectors.getAllTopics()).toEqual(['a', 'b']);
  });

  it('initial state', () => {
    expect(uut.selectors.getAllTopics()).toEqual([]);
  });
});
