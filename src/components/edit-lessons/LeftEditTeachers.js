import React from 'react'

const LeftEditTeachers = ()  => {
    return (
        <div>
            <div class="form-group">
                <label for="usr">Öğretmenin Adı:</label>
                <input type="text" class="form-control" id="usr"/><br/>                
                <label for="usr">Öğretmenin Adı:</label>
                <input type="text" class="form-control" id="usr"/><br/>
                <label for="usr">Öğretmenin Adı:</label>
                <input type="text" class="form-control" id="usr"/><br/>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-secondary">Dersi Ekle</button>
            </div>
            <br/><br/><br/><br/>    
            <div class="d-flex justify-content-center">
                <label class="textcenter">Kaldırmak istenilen dersleri işaretleyin.</label>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditTeachers
