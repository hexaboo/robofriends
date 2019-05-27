import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import ErrorBoundary from '../components/ErrorBoundary';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import { setSearchField, requestRobots } from '../actions';

import './App.css';


const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}


class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <Suspense fallback="">
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            {isPending ? <h1>Loading</h1> :
              <ErrorBoundary>
                <Suspense fallback="Loading...">
                  <CardList robots={filteredRobots} />
                </Suspense>
              </ErrorBoundary>
            }
          </Scroll>
        </Suspense>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
