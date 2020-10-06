import React, { useContext } from "react";
import {AuthContext} from './AuthContext'

import {render} from 'react-dom';
import './style/index.css';
import * as serviceWorker from './serviceWorker';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import EditEtude from './views/Edit-etudes';
import EditStudent from './views/Edit-students';
import EditTeacher from './views/Edit-teachers';
import Panel from './views/Panel';
import ReportClass from './views/Report-classes';
import ReportHomework from './views/Report-homeworks';
import ReportStuent from './views/Report-students';
import ReportTeacher from './views/Report-teachers';
import Navbar from './components/Navbar';
import EditLessons from './views/Edit-lessons';
import EditClasses from './views/Edit-classes';
import EditHomework from './views/Edit-homeworks';
import UpdateHomework from './views/Update-homeworks';
import UpdateEtude from './views/Update-etudes';
import { isValid } from 'ipaddr.js';
import Login from './views/Login';
import {AuthProvider} from './AuthContext'
import App from "./App";

const Routes = () => {
  return(
    <Switch >
      <Route exact path="/edit-lessons" component={EditLessons}/>
      <Route exact path="/edit-students" component={EditStudent}/>
      <Route exact path="/edit-teachers" component={EditTeacher}/>
      <Route exact path="/edit-etudes" component={EditEtude}/>
      <Route exact path="/edit-homeworks" component={EditHomework}/>
      <Route exact path="/edit-classes" component={EditClasses}/>
      <Route exact path="/edit-students" component={EditStudent}/>
      <Route exact path="/report-students" component={ReportStuent}/>
      <Route exact path="/report-teachers" component={ReportTeacher}/>
      <Route exact path="/report-classes" component={ReportClass}/>
      <Route exact path="/report-homeworks" component={ReportHomework}/>
      <Route exact path="/update-etudes" component={UpdateEtude}/>
      <Route exact path="/update-homeworks" component={UpdateHomework}/>
      <Route path="/" render={() => <Panel selam={"hi"}/>} />
    </Switch>
  ) 
}


render(
  <BrowserRouter>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
