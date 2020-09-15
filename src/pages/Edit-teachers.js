import React, {useEffect, useState} from 'react';
import Table from '../components/Table';


const EditTeachers = () => {
    const [teachers, setTeachers] = useState([])
    const [lessons, setLessons] = useState([])
    
    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseLessons = await fetch("http://localhost:3000/getLessons")
        const responseTeachers = await fetch("http://localhost:3000/getTeachers")
        const tempLessons = await responseLessons.json();
        const tempTeachers = await responseTeachers.json();
        setLessons(tempLessons.data)
        setTeachers(tempTeachers.data)
    }

    const selectBox = lessons.map(lesson => {
        return (
          <option key={lesson.LESSONNAME}>{lesson.LESSONNAME}</option>
        )
    })

    const columns = [
        {
            name: 'Öğretmen Adı',
            selector: 'TEACHERNAME',
            sortable: true,
        },
        {
            name: 'Branş',
            selector: 'LESSONNAME',
            sortable: true,
        },
        {
            name: 'Telephone Number',
            selector: 'TELNUMBER',
            sortable: true,
        },
      ];
      

    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Öğretmenin Adı:</label>
                        <input type="text" className="form-control" id="usrName"/><br/>                
                        <label htmlFor="usrLesson">Öğretmenin Branşı:</label>
                        <select className="form-control" id="usrLesson">
                            {selectBox}
                        </select><br/>
                        <label htmlFor="usrTel">Öğretmenin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="text" className="form-control" id="usrTel" placeholder="555-555-5555" aria-describedby="inputGroupPrepend3"/>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary">Öğretmeni Ekle</button>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="d-flex justify-content-center">
                        <label className="textcenter">Kaldırmak istenilen öğretmenleri işaretleyin.</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
                    </div>
                    <br/><br/>
                </div>
                <div className="col auto">
                    <Table columns={columns} data={teachers}/>
                </div>
            </div>
        </div>)
}

export default EditTeachers;