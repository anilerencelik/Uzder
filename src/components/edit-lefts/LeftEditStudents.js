import React, {useState, useEffect} from 'react'

const LeftEditStudents = ()  => {
    const [classes, setClasses] = useState([])

    useEffect( () => {
        getClasses()
    },[])

    const getClasses = async () => {
        const response = await fetch("http://localhost:3000/getClasses")
        const x = await response.json();
        setClasses(x.data)
    }

    const selectBox = classes.map(data => {
        return (
          <option key={data.CLASSNAME}>{data.CLASSNAME}</option>
        )
    })

    
    return (
        <div>
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
    )
}

export default LeftEditStudents
