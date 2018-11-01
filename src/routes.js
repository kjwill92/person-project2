import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Login/Login';


export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/main" component={Main}/>
    </Switch>
)