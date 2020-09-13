import React from 'react';
import LeftEditLessons from '../components/edit-lefts/LeftEditLessons';


const EditLessons = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 ">
                    <LeftEditLessons/>
                </div>
                <div class="col auto">
                    this is lg column
                </div>
            </div>
        </div>)
}

export default EditLessons;