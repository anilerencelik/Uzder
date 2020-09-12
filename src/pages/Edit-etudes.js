import React from 'react';
import { useLocation } from 'react-router-dom';

const EditEtudes = () => {
    let location = useLocation()
    console.log(location);
    return(
    <div>
        {location.pathname === "/edit-etudes"
         ? <h3>Patates</h3> : <h3>Börek</h3>}
        <h1>This Page is EditEtude</h1>
    </div>)
}

export default EditEtudes;