import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import ToolSearch from './components/ToolSearch/ToolSearch';
import Profile from './components/Profile/Profile';
import FAQ from './components/FAQ/FAQ';


export default (
<Switch>
    <Route component={Home} exact path="/" />
    <Route component={ToolSearch} path="/search" />
    <Route component={Profile} path="/profile" />
    <Route component={FAQ} path="/faq" />
</Switch>
)