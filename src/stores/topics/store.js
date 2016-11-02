import * as remx from 'remx';

const state = remx.state({
  allTopics: []
});

export const store = remx.setters({
  topicsFetched(topics) {
    state.allTopics = topics;
  }
});

export const selectors = remx.getters({
  getAllTopics() {
    return state.allTopics.slice();
  }
});
