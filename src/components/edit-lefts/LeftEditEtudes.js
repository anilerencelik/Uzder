import React, {useState, useEffect} from 'react'

const LeftEditEtudes = ()  => {

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])

    
    useEffect( () => {
        getSelecteds()
    },[])

    const getSelecteds = async () => {
        const responseStudents = await fetch("http://localhost:3000/getStudents")
        const responseTeachers = await fetch("http://localhost:3000/getTeachers")
        const x = await responseStudents.json();
        const y = await responseTeachers.json();
        setStudents(x.data)
        setTeachers(y.data)
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


    return (
        <div>
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
    )
}

export default LeftEditEtudes
