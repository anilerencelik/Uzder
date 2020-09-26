import React from 'react';
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
import UpdateEtude from './components/Table';
import UpdateEtudeWeek from './views/Update-week-etudes';
import UpdateHomework from './components/Table';
import UpdateHomeworkWeek from './views/Update-week-homeworks';

import Navbar from './components/Navbar';
import EditLessons from './views/Edit-lessons';
import EditClasses from './views/Edit-classes';
import EditHomework from './views/Edit-homeworks';

const Routes = () => {
  return(
    <Switch>
      <Route path="/edit-lessons" exact component={EditLessons}/>
      <Route path="/edit-students" exact component={EditStudent}/>
      <Route path="/edit-teachers" exact component={EditTeacher}/>
      <Route path="/edit-etudes" exact component={EditEtude}/>
      <Route path="/edit-homeworks" exact component={EditHomework}/>
      <Route path="/edit-classes" exact component={EditClasses}/>
      <Route path="/edit-students" exact component={EditStudent}/>
      <Route path="/report-students" exact component={ReportStuent}/>
      <Route path="/report-teachers" exact component={ReportTeacher}/>
      <Route path="/report-classes" exact component={ReportClass}/>
      <Route path="/report-homeworks" exact component={ReportHomework}/>
      <Route path="/update-etudes" exact component={UpdateEtude}/>
      <Route path="/update-etude-week" exact component={UpdateEtudeWeek}/>
      <Route path="/update-homeworks" exact component={UpdateHomework}/>
      <Route path="/update-homework-week" exact component={UpdateHomeworkWeek}/>
      <Route path="/" component={Panel}/>
    </Switch>
  ) 
}

render(
  <BrowserRouter>
    <Navbar/>
    <Routes/>
  </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
