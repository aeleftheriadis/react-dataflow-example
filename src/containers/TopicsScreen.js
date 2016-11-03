// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, {Component} from 'react';
import autobind from 'react-autobind';
import './TopicsScreen.css';
import {connect} from 'remx/react';

import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

import * as topicsActions from '../stores/topics/actions';
import {selectors} from './../stores/topics/store';

class TopicsScreen extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    topicsActions.fetchPosts();
  }

  render() {
    if (selectors.isLoading()) {
      return this.renderLoading();
    } else {
      return this.renderTopics();
    }
  }

  renderTopics() {
    const allTopicsByUrl = selectors.getAllTopics();
    const allTopicUrls = selectors.getAllTopicsUrls();
    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowsIdArray={allTopicUrls}
          rowsById={allTopicsByUrl}
          renderRow={this.renderTopic}
        />
      </div>
    );
  }

  renderTopic(topicUrl, topic) {
    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.onRowClick}
        selected={selectors.isSelected(topicUrl)}
      >
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  onRowClick(topicUrl) {
    alert(topicUrl);
  }
}

export default connect(TopicsScreen);
