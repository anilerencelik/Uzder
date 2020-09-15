import React, {useState, useEffect} from 'react';
import Table from '../components/Table'



const EditLessons = () => {

    const [lessons, setLessons] = useState([])

    useEffect( () => {
        getLessons()
    },[])

    const getLessons = async () => {
        const response = await fetch("http://localhost:3000/getLessons")
        const temp = await response.json()
        setLessons(temp.data)
        console.log(temp)
    }

    const columns = [{
        name: 'Ders Adı',
        selector: 'LESSONNAME',
        sortable: true,
    },]

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Dersin Adı:</label>
                        <input type="text" className="form-control" id="usrName"/><br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Dersi Ekle</button>
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
                <div className="col auto">
                    <Table data={lessons} columns={columns} id="rightTable"/>
                </div>
            </div>
        </div>
        )
}

export default EditLessons;