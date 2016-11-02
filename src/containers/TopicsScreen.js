// containers are "smart" react components that are derived from the state,
// they observe the state using selectors and draw themselved using dumb components
// avoid having view logic & local component state in them, use "dumb" components (with presenters) instead

import React, {Component} from 'react';
import autobind from 'react-autobind';
import './TopicsScreen.css';
import {connect} from 'remx/react';
import _ from 'lodash';

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
    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ul>
          {_.map(selectors.getAllTopics(), (topic) => this.renderTopic(topic))}
        </ul>
      </div>
    );
  }

  renderTopic(topic) {
    return (
      <li key={topic.title}>
        {topic.title}
      </li>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }
}

export default connect(TopicsScreen);
