import React from 'react';
import LeftEditHomeworks from '../components/edit-lefts/LeftEditHomeworks';


const EditHomeworks = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <LeftEditHomeworks/>
                </div>
                <div className="col auto">
                    this is lg column
                </div>
            </div>
        </div>
    )
}

export default EditHomeworks;