import React, {useState, useEffect} from 'react';
import Table from '../components/Table';


const EditHomeworks = () => {
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])
    const [homeworks, setHomeworks] = useState([])

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseTeachers = await fetch("http://localhost:3000/getTeachers")
        const responseClasses = await fetch("http://localhost:3000/getClasses")
        const responseHomeworks = await fetch("http://localhost:3000/getHomeworks")
        const tempTeachers = await responseTeachers.json();
        const tempClasses  = await responseClasses.json();
        const tempHomeworks = await responseHomeworks.json();
        setClasses(tempClasses.data)
        setTeachers(tempTeachers.data)
        setHomeworks(tempHomeworks.data)
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

    const columnsRightTable = [
        {
            name: 'Ödevin Adı',
            selector: 'NAME',
            sortable: true,
        },
        {
            name: 'Ödevi Veren Öğretmen',
            selector: 'TEACHERNAME',
            sortable: true,
        },
        {
            name: 'Teslim Tarihi',
            selector: 'DEADLINE',
            sortable: true,
        },
    ];



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Ödevin Adı:</label>
                        <input type="text" className="form-control" id="usrName" placeholder="Tüm ödevlerin ismi farklı olmalıdır."/><br/>
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
                <div className="col auto">
                    <Table columns={columnsRightTable} data={homeworks}/>
                </div>
            </div>
        </div>
    )
}

export default EditHomeworks;