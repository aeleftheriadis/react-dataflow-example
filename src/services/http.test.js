describe('services/http', () => {
  let uut;
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    uut = require('./http');
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  describe('get', () => {
    it('adds headers', async() => {
      mockFetch.mockReturnValue(Promise.resolve({ok: true, json: () => Promise.resolve('hello')}));
      expect(mockFetch).toHaveBeenCalledTimes(0);
      await uut.get('hello');
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('hello', {headers: {Accept: 'application/json'}, method: 'GET'});
    });

    it('throws when not OK', async() => {
      mockFetch.mockReturnValue(Promise.resolve({ok: false}));
      try {
        await uut.get('hello');
        fail();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
});
