import React, {useState, useEffect} from 'react';
import Table from '../components/Table';

const EditEtudes = () => {
    const [etudes, setEtudes] = useState([])
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])

    
    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseStudents = await fetch("http://localhost:3000/getStudentNames")
        const responseTeachers = await fetch("http://localhost:3000/getTeacherNames")
        const responseEtudes = await fetch("http://localhost:3000/getEtudes")
        const tempStudents = await responseStudents.json();
        const tempTeachers = await responseTeachers.json();
        const tempEtudes = await responseEtudes.json();
        setStudents(tempStudents.data)
        setTeachers(tempTeachers.data)
        setEtudes(tempEtudes.data)
    }

        
    const selectBoxStudent = students.map(data => {
        return (
          <option key={data.STUDENTNAME}>{data.STUDENTNAME}</option>
        )
    })
    const selectBoxTeachers = teachers.map(data => {
        return (
          <option key={data.TEACHERNAME}>{data.TEACHERNAME}</option>
        )
    })


    const columns = [
        {
            name: 'Öğretmen',
            selector: 'TEACHERNAME',
            sortable: true,
        },
        {
            name: 'Öğrenci',
            selector: 'STUDENTNAME',
            sortable: true,
        },
        {
            name: 'Öğrenci No',
            selector: 'SCHOOLNO',
            sortable: true,
        },
        {
            name: 'Tarih',
            selector: 'DATE',
            sortable: true,
        },
        {
            name: 'Saati',
            selector: 'TIME',
            sortable: true,
        },        {
            name: 'Durum',
            selector: 'STATE',
            sortable: true,
        },
    ];


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Birebiri Veren Öğretmen:</label>
                        <select className="form-control" id="usrName">
                            {selectBoxTeachers}
                        </select><br/>
                        <label htmlFor="usrStudent">Birebiri Alan Öğrenci:</label>
                        <select className="form-control" id="usrStudent">
                            {selectBoxStudent}
                        </select><br/>
                        <div className="row ">
                            <div className="col">
                                <label htmlFor  ="usrDatetime">Birebirin Tarihi:</label>
                            </div>
                            <div className="col">
                                <input type="datetime-local" id="usrDatetime"/><br/>
                            </div>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary">Birebiri Ekle</button>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="d-flex justify-content-center">
                        <label className="textcenter">Kaldırmak istenilen birebiri işaretleyin.</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
                    </div>
                    <br/><br/>
                </div>
                <div className="col auto">
                    <Table columns={columns} data={etudes}/>
                </div>
            </div>
        </div>)
}

export default EditEtudes;