beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('reddit service', () => {
  let uut;
  const mockGet = jest.fn();
  const reddit1 = {data: {display_name: 'name1', public_description: 'desc1', url: 'url1'}}; //eslint-disable-line
  const reddit2 = {data: {display_name: 'name2', public_description: 'desc2', url: 'url2'}}; //eslint-disable-line
  const data = {
    children: [reddit1, reddit2]
  };

  beforeEach(() => {
    jest.setMock('./http', {get: mockGet});
    uut = require('./reddit');
  });

  it('returns the deafult subreddits', async() => {
    mockGet.mockReturnValue(Promise.resolve(Promise.resolve({data})));
    const result = await uut.getDefaultSubreddits();
    const result1 = {title: 'name1', description: 'desc1', url: 'url1'};
    const result2 = {title: 'name2', description: 'desc2', url: 'url2'};
    expect(result).toEqual([result1, result2]);
  });

  it('throws when has not children', async() => {
    mockGet.mockReturnValue(Promise.resolve({}));
    try {
      await uut.getDefaultSubreddits();
      fail();
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('calls the correct endpoint', async() => {
    mockGet.mockReturnValue(Promise.resolve({data}));
    await uut.getDefaultSubreddits();
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet.mock.calls[0][0]).toEqual('https://www.reddit.com/subreddits/default.json');
  });
});
