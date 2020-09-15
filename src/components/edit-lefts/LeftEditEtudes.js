import React, {useState, useEffect} from 'react'

const LeftEditEtudes = ()  => {

    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])

    
    useEffect( () => {
        getSelecteds()
    },[])

    const getSelecteds = async () => {
        const responseStudents = await fetch("http://localhost:3000/getStudentNames")
        const responseTeachers = await fetch("http://localhost:3000/getTeacherNames")
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

        </div>
    )
}

export default LeftEditEtudes
