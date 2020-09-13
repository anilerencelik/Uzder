import React from 'react';
import LeftEditLessons from '../components/edit-lefts/LeftEditLessons';


const EditLessons = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <LeftEditLessons/>
                </div>
                <div className="col auto">
                    this is lg column
                </div>
            </div>
        </div>)
}

export default EditLessons;