import React from 'react';
import LeftEditEtudes from '../components/edit-lefts/LeftEditEtudes';

const EditEtudes = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <LeftEditEtudes/>
                </div>
                <div className="col auto">
                    this is lg column
                </div>
            </div>
        </div>)
}

export default EditEtudes;