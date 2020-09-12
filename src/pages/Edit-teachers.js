import React from 'react';
import LeftEditTeacher from '../components/edit-lessons/LeftEditTeachers';
import Sql from '../components/Sql';


const EditTeachers = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 ">
                    <LeftEditTeacher/>
                </div>
                <div class="col auto">
                    <Sql/>
                </div>
            </div>
        </div>)
}

export default EditTeachers;