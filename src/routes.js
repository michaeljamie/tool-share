import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import Home from './components/Home/Home';
import ToolSearch from './components/ToolSearch/ToolSearch';

export default (
    <Switch>
        {/* <Route component={Home} exact path="/" /> */}
        <Route component={ToolSearch} exact path="/search" />
      </Switch>
)