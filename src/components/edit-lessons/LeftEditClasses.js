import React from 'react'
import Table from '../Table'

const LeftEditClasses = ()  => {
    return (
        <div>
            <div class="form-group">
                <label for="usr">Sınıfın Adı:</label>
                <input type="text" class="form-control" id="usr"/>
            </div>
            <label>Sınıfın Alması Gereken Dersleri Seçin.</label>
            <Table sql="" scrollHeight="25vh"/><br/><br/>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-secondary">Sınıfı Ekle</button>
            </div>
            <br/><br/><br/>
            <div class="d-flex justify-content-center">
                <label class="textcenter">Kaldırmak istenilen sınıfları işaretleyin.</label>
            </div><br/>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditClasses
