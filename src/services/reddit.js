// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service.
// More importantly, these are the boundary objects, implementing the interface for all external dependencies.
// These can include http requests, db (both local and remote), and even static UI operations.
// These all should be PLUGINS to the application.

// abstract away the specifics of the reddit API response and take only the fields we care about

import _ from 'lodash';
import * as http from './http';

const REDDIT_ENDPOINT = 'https://www.reddit.com';
const DEFAULT_SUBREDDITS_URL = `${REDDIT_ENDPOINT}/subreddits/default.json`;

export async function getDefaultSubreddits() {
  const data = await http.get(DEFAULT_SUBREDDITS_URL);
  return parseChildren(getChildren(data));
}

function parseChild(subreddit) {
  return {
    title: _.get(subreddit, 'data.display_name'),
    description: _.get(subreddit, 'data.public_description'),
    url: _.get(subreddit, 'data.url')
  };
}

function getChildren(data) {
  const children = _.get(data, 'data.children');
  if (!children) {
    throw new Error(`RedditService getDefaultSubreddits failed, children not returned`);
  }
  return children;
}

function sortChildren(children) {
  return _.orderBy(children, 'data.subscribers', 'desc');
}
function parseChildren(children) {
  return _.map(sortChildren(children), parseChild);
}
