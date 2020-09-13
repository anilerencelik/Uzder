import React from 'react'

const LeftEditEtudes = ()  => {
    return (
        <div>
            <div class="form-group">
                <label for="usr">Birebiri Veren Öğretmen:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="bir">1</option>
                    <option value="iki">2</option>
                    <option value="üç">3</option>
                    <option value="dört">4</option>
                    <option value="beş">5</option>
                </select><br/>
                <label for="usr">Birebiri Alan Öğrenci:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="bir">1</option>
                    <option value="iki">2</option>
                    <option value="üç">3</option>
                    <option value="dört">4</option>
                    <option value="beş">5</option>
                </select><br/>
                <div class="row ">
                    <div class="col">
                        <label for="usr">Birebirin Tarihi:</label>
                    </div>
                    <div class="col">
                        <input type="datetime-local" id="addDate"/><br/>
                    </div>
                </div><br/>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary">Birebiri Ekle</button>
                </div>
            </div>
            <br/><br/>
            <div class="d-flex justify-content-center">
                <label class="textcenter">Kaldırmak istenilen birebiri işaretleyin.</label>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditEtudes
