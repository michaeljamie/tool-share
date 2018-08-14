import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import Home from './components/Home/Home';
import ToolSearch from './components/ToolSearch/ToolSearch';
import Profile from './components/Profile/Profile';

export default (
    <Switch>
        {/* <Route component={Home} exact path="/" /> */}
        <Route component={ToolSearch} exact path="/search" />
        <Route component={Profile} exact path='/profile'/>
      </Switch>
)