import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  allTopics: {},
  loading: true
});

export const store = remx.setters({
  topicsFetched(topics) {
    if (_.isArray(topics)) {
      state.allTopics = _.keyBy(topics, (t) => t.url);
    } else {
      state.allTopics = topics;
    }
    state.loading = false;
  },

  selectTopicUrl(topicUrl) {
    //
  }
});

export const selectors = remx.getters({
  getAllTopics() {
    return state.allTopics;
  },

  getAllTopicsUrls() {
    return _.keys(state.allTopics);
  },

  isLoading() {
    return state.loading;
  }
});
