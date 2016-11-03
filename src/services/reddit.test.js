beforeEach(() => {
  jest.disableAutomock();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('services/reddit', () => {
  let uut;
  let mockGet;
  const reddit1 = {data: {display_name: 'name1', public_description: 'desc1', url: 'url1', subscribers: 3}}; //eslint-disable-line
  const reddit2 = {data: {display_name: 'name2', public_description: 'desc2', url: 'url2', subscribers: 1}}; //eslint-disable-line
  const reddit3 = {data: {display_name: 'name3', public_description: 'desc3', url: 'url3', subscribers: 2}}; //eslint-disable-line
  const data = {children: [reddit1, reddit2]};
  const result1 = {title: 'name1', description: 'desc1', url: 'url1'};
  const result2 = {title: 'name2', description: 'desc2', url: 'url2'};
  const result3 = {title: 'name3', description: 'desc3', url: 'url3'};

  beforeEach(() => {
    jest.mock('./http');
    mockGet = require('./http').get;
    uut = require('./reddit');
  });

  it('returns the deafult subreddits', async() => {
    mockGet.mockReturnValue(Promise.resolve({data}));
    const result = await uut.getDefaultSubreddits();
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

  it('sorts returned children by number of subscribers, descending', async() => {
    mockGet.mockReturnValue(Promise.resolve({data: {children: [reddit1, reddit2, reddit3]}}));
    const result = await uut.getDefaultSubreddits();
    expect(result).toEqual([result1, result3, result2]);
  });
});
