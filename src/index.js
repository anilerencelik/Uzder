import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import * as serviceWorker from './serviceWorker';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import EditEtude from './pages/Edit-etudes';
import EditStudent from './pages/Edit-students';
import EditTeacher from './pages/Edit-teachers';
import Panel from './pages/Panel';
import ReportClass from './pages/Report-classes';
import ReportHomework from './pages/Report-homeworks';
import ReportStuent from './pages/Report-students';
import ReportTeacher from './pages/Report-teachers';
import UpdateEtude from './components/Table';
import UpdateEtudeWeek from './pages/Update-week-etudes';
import UpdateHomework from './components/Table';
import UpdateHomeworkWeek from './pages/Update-week-homeworks';

import Navbar from './components/Navbar';
import EditLessons from './pages/Edit-lessons';
import EditClasses from './pages/Edit-classes';
import EditHomework from './pages/Edit-homeworks';

const Routes = () => {
  return(
    <Switch>
      <Route path="/" exact component={Panel}/>
      <Route path="/panel" exact component={Panel}/>
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
    </Switch>
  ) 
}

/*
ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
        <Header/>
        <Routes/>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <BrowserRouter>
    <Navbar/>
    <Routes/>
  </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
