import React from 'react';
import LeftEditStudents from '../components/edit-lefts/LeftEditStudents';


const EditStudents = () => {
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <LeftEditStudents/>
                </div>
                <div className="col auto">
                    this is lg column
                </div>
            </div>
        </div>    
        )

}

export default EditStudents;