import React from 'react'

const LeftEditLessons = ()  => {

    return (
        <div>
            <div className="form-group">
                <label htmlFor="usrName">Dersin Adı:</label>
                <input type="text" className="form-control" id="usrName"/><br/>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary">Dersi Ekle</button>
                </div>
                <br/><br/>   
            </div>
            <div className="d-flex justify-content-center">
                <label className="textcenter">Kaldırmak istenilen dersleri işaretleyin.</label>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditLessons
