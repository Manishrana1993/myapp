import React, { Component } from 'react';
import Main from './Main';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/create" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
