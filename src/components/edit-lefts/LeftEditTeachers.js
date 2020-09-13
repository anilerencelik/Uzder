import React from 'react'

const LeftEditTeachers = ()  => {
    return (
        <div>
            <div class="form-group">
                <label for="usr">Öğretmenin Adı:</label>
                <input type="text" class="form-control" id="usr"/><br/>                
                <label for="usr">Öğretmenin Branşı:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="bir">1</option>
                    <option value="iki">2</option>
                    <option value="üç">3</option>
                    <option value="dört">4</option>
                    <option value="beş">5</option>
                </select><br/>
                <label for="usr">Öğretmenin Telefon Numarası:</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend3">+90</span>
                    </div>
                    <input type="text" class="form-control" id="validationServerUsername" placeholder="555-555-5555" aria-describedby="inputGroupPrepend3"/>
                </div><br/>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-secondary">Öğretmeni Ekle</button>
            </div>
            <br/><br/>
            <div class="d-flex justify-content-center">
                <label class="textcenter">Kaldırmak istenilen öğretmenleri işaretleyin.</label>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditTeachers
