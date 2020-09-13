import React, {useState, useEffect}  from 'react'

const LeftEditTeachers = ()  => {

    const [lessons, setLessons] = useState([])

    useEffect( () => {
        getLessons()
    },[])

    const getLessons = async () => {
        const response = await fetch("http://localhost:3000/getLessons")
        const temp = await response.json();
        setLessons(temp.data)
    }

    const selectBox = lessons.map(lesson => {
        return (
          <option key={lesson.LESSONNAME}>{lesson.LESSONNAME}</option>
        )
    })

    return (
        <div>
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
    )
}

export default LeftEditTeachers
