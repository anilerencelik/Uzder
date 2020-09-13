import React from 'react';
import LeftEditClasses from '../components/edit-lefts/LeftEditClasses';


const EditClasses = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <LeftEditClasses/>
                </div>
                <div className="col auto">
                    this is lg column
                </div>
            </div>
        </div>)
}

export default EditClasses;