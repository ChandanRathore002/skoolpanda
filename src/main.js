import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

import './style/app.scss';
import AddSchool from './containers/AddSchool';
import AddStaff from './containers/AddStaff';
import createStore from './redux/create-store';
import HomePage from './containers/HomePage';
import NotFound from './components/Notfound';
import School from './containers/School';
import Staff from './containers/Staff';
import Login from './containers/Login';
import LogOut from './components/LogOut';

const history = createMemoryHistory();

const store = createStore(history, window.__INITIAL_STATE__);

class Main extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={HomePage} />
            <Route path="/schools" component={School} />
            <Route path="/staff" component={Staff} />
            <Route path="/add-schools" component={AddSchool} />
            <Route path="/add-staff" component={AddStaff} />
            <Route path="/logout" component={LogOut} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Main;
