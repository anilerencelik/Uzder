import React, {useState, useEffect} from 'react'
import Table from '../Table'

const LeftEditHomeworks = ()  => {
    
    const [classes, setClasses] = useState([])

    useEffect( () => {
        getClasses()
    },[])

    const getClasses = async () => {
        const response = await fetch("http://localhost:3000/getClasses")
        const x = await response.json();
        setClasses(x.data)
    }

    const columns = [
        {
          name: 'Sınıf Adı',
          selector: 'CLASSNAME',
          sortable: true,
        },
    ];

    return (
        <div>
            <div className="form-group">
                <label htmlFor="usr">Ödevin Adı:</label>
                <input type="text" className="form-control" id="usr"/><br/>
                <label>Ödevin Verileceği Sınıfları Seçin.</label>
                <Table data={classes} columns={columns} scrollHeight="25vh"/><br/>
                <label for="usr">Ödevi Veren Öğretmen:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                    <option value="bir">1</option>
                    <option value="iki">2</option>
                    <option value="üç">3</option>
                    <option value="dört">4</option>
                    <option value="beş">5</option>
                </select><br/>
                <div class="row ">
                    <div class="col">
                        <label for="usr">Ödevin Kontrol Günü:</label>
                    </div>
                    <div class="col">
                        <input type="date" id="addDate"/><br/>
                    </div>
                </div><br/>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary">Ödevi Ekle</button>
                </div>
            </div>
            <br/><br/>
            <div className="d-flex justify-content-center">
                <label className="textcenter">Kaldırmak istenilen ödevleri işaretleyin.</label>
            </div><br/>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditHomeworks
