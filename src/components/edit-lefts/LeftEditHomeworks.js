import React, {useState, useEffect} from 'react'
import Table from '../Table'

const LeftEditHomeworks = ()  => {
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseTeachers = await fetch("http://localhost:3000/getTeachers")
        const responseClasses = await fetch("http://localhost:3000/getClasses")
        const temp = await responseTeachers.json();
        setTeachers(temp.data)
        const x = await responseClasses.json();
        setClasses(x.data)
    }

    const selectBox = teachers.map(teacher => {
        return (
          <option key={teacher.TEACHERNAME}>{teacher.TEACHERNAME}</option>
        )
    })


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
                <label htmlFor="usrName">Ödevin Adı:</label>
                <input type="text" className="form-control" id="usrName"/><br/>
                <label htmlFor="usrClass">Ödevin Verileceği Sınıfları Seçin.</label>
                <Table data={classes} columns={columns} scrollHeight="25vh" id="usrClass"/><br/>
                <label htmlFor="usrTeacher">Ödevi Veren Öğretmen:</label>
                <select className="form-control" id="usrTeacher">
                    {selectBox}
                </select><br/>
                <div className="row ">
                    <div className="col">
                        <label htmlFor="usrDate">Ödevin Kontrol Günü:</label>
                    </div>
                    <div className="col">
                        <input type="date" id="usrDate"/><br/>
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
