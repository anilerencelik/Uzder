import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import EditClasses from "./views/Edit-classes";
import EditEtudes from "./views/Edit-etudes";
import EditHomeworks from "./views/Edit-homeworks";
import EditLessons from "./views/Edit-lessons";
import EditStudents from "./views/Edit-students";
import EditTeachers from "./views/Edit-teachers";
import Login from './views/Login'
import Panel from "./views/Panel";
import ReportClasses from "./views/Report-classes";
import ReportHomework from "./views/Report-homeworks";
import ReportStudent from "./views/Report-students";
import ReportTeacher from "./views/Report-teachers";
import UpdateEtudes from "./views/Update-etudes";
import UpdateHomework from "./views/Update-homeworks";

const Routes = () => {
    return(
      <Switch >
        <Route exact path="/edit-lessons" component={EditLessons} />
        <Route exact path="/edit-students" component={EditStudents}/>
        <Route exact path="/edit-teachers" component={EditTeachers}/>
        <Route exact path="/edit-etudes" component={EditEtudes}/>
        <Route exact path="/edit-homeworks" component={EditHomeworks}/>
        <Route exact path="/edit-classes" component={EditClasses}/>
        <Route exact path="/report-students" component={ReportStudent}/>
        <Route exact path="/report-teachers" component={ReportTeacher}/>
        <Route exact path="/report-classes" component={ReportClasses}/>
        <Route exact path="/report-homeworks" component={ReportHomework}/>
        <Route exact path="/update-etudes" component={UpdateEtudes}/>
        <Route exact path="/update-homeworks" component={UpdateHomework}/>
        <Route path="/" component={Panel}/>
      </Switch>
    ) 
  }
  

class App extends React.Component
{   
  render(){
    return (
        localStorage.getItem('token') == null? <Login>{console.log(localStorage.getItem('token'))}</Login> : <div><Navbar/>{console.log(localStorage.getItem('token'))}<Routes/></div>
        
    )
  }
}


export default App
