import React, {useState, useEffect} from 'react';
import Table from '../components/Table'

const EditClasses = () => {
    
    const [lessons, setLessons] = useState([])
    const [classes, setClasses] = useState([])

    useEffect( () => {
        getSelections()
        
    },[])

    const getSelections = async () => {
        const responseLesson = await fetch("http://localhost:3000/getLessons")
        const responseClass = await fetch("http://localhost:3000/getClasses")
        const tempLesson = await responseLesson.json();
        const tempClass = await responseClass.json();
        setLessons(tempLesson.data)
        setClasses(tempClass.data)
    }



    const columnsLeftTable = [
        {
          name: 'Ders Adı',
          selector: 'LESSONNAME',
          sortable: true,
        },
    ];
    const columnsRightTable = [
        {
          name: 'Sınıfın Adı',
          selector: 'CLASSNAME',
          sortable: true,
        },
    ];



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Sınıfın Adı:</label>
                        <input type="text" className="form-control" id="usrName"/>
                        <br/>
                        <label htmlFor="usrLessons">Sınıfın Alması Gereken Dersleri Seçin.</label>
                        <Table data={lessons} columns={columnsLeftTable} scrollHeight="25vh" id="usrLessons"/><br/>
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
                <div className="col auto">
                    <Table columns={columnsRightTable} data={classes} id="rightTable"/>
                </div>
            </div>
        </div>
    )
}

export default EditClasses;