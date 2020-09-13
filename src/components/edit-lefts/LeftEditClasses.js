import React, {useState, useEffect} from 'react'
import Table from '../Table'

const LeftEditClasses = ()  => {
    
    const [lessons, setLessons] = useState([])

    useEffect( () => {
        getLessons()
    },[])

    const getLessons = async () => {
        const response = await fetch("http://localhost:3000/getLessons")
        const temp = await response.json();
        setLessons(temp.data)
    }

    const columns = [
        {
          name: 'Ders Adı',
          selector: 'LESSONNAME',
          sortable: true,
        },
    ];

    return (
        <div>
            <div className="form-group">
                <label htmlFor="usrName">Sınıfın Adı:</label>
                <input type="text" className="form-control" id="usrName"/>
                <br/>
                <label htmlFor="usrLessons">Sınıfın Alması Gereken Dersleri Seçin.</label>
                <Table data={lessons} columns={columns} scrollHeight="25vh" id="usrLessons"/><br/>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary">Sınıfı Ekle</button>
                </div>
            </div>
            <br/>
            <div className="d-flex justify-content-center">
                <label className="textcenter">Kaldırmak istenilen sınıfları işaretleyin.</label>
            </div><br/>
            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
            </div>
            <br/><br/>
        </div>
    )
}

export default LeftEditClasses
