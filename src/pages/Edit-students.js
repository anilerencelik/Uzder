import React, {useState, useEffect} from 'react';
import Table from '../components/Table';


const EditStudents = () => {
    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])

    useEffect( () => {
        getSelections()
    },[])

    const getSelections= async () => {
        const responseClasses = await fetch("http://localhost:3000/getClasses")
        const responseStudents = await fetch("http://localhost:3000/getStudents")
        const tempClasses = await responseClasses.json();
        const tempStudents  = await responseStudents.json();
        setClasses(tempClasses.data)
        setStudents(tempStudents.data)
    }

    const selectBox = classes.map(data => {
        return (
          <option key={data.CLASSNAME}>{data.CLASSNAME}</option>
        )
    })

    const columns = [
        {
            name: 'Öğrenci Adı',
            selector: 'STUDENTNAME',
            sortable: true,
        },
        {
            name: 'Numara',
            selector: 'SCHOOLNO',
            sortable: true,
        },
        {
            name: 'Sınıf',
            selector: 'CLASSNAME',
            sortable: true,
        },
        {
            name: 'Veli Tel',
            selector: 'PARENTTELNO',
            sortable: true,
        },]

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <div className="form-group">
                        <label htmlFor="usrName">Öğrencinin Adı:</label>
                        <input type="text" className="form-control" id="usrName"/><br/>                
                        <label htmlFor="usrClass">Öğrencinin Sınıfı:</label>
                        <select className="form-control" id="usrClass">
                            {selectBox}
                        </select><br/>
                        <label htmlFor="usrNo">Öğrenci No:</label>
                        <input type="text" className="form-control" id="usrNo"/><br/>   
                        <label htmlFor="usrParentTel">Velinin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="text" className="form-control" id="usrParentTel" placeholder="555-555-5555" aria-describedby="inputGroupPrepend3"/>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary">Öğrenci Ekle</button>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="d-flex justify-content-center">
                        <label className="textcenter">Kaldırmak istenilen öğrencileri işaretleyin.</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-danger">Seçilenleri Kaldır</button>
                    </div>
                    <br/><br/>
                </div>
                <div className="col auto">
                    <Table columns={columns} data={students}/>
                </div>
            </div>
        </div>    
        )

}

export default EditStudents;