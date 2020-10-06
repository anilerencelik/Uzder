import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"

const EditEtudes = () => {
    const token = localStorage.getItem('token')

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.DATE + " " + r.TIME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.ETUDEID)})
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
    }, [data, selectedRows, toggleCleared]);

    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteEtude?token=${token}&id=${id}`)
        console.log(answer)
    }




    const [etudes, setEtudes] = useState([])
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])



    const [addTeacher, setAddTeacher] = useState()
    const [addStudent, setAddStudent] = useState()
    const [time, setTime] = useState('')
    const updateTime = e => {
        setTime(e.target.value)
    }

    const send = async () => {
        const answer = await fetch(`${backend}/addEtude?token=${token}&teacherid=${addTeacher}&studentid=${addStudent}&date=${time.split('T')[0]}&time=${time.split('T')[1]}`)
        console.log(answer)
    }


    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseStudents = await fetch(`${backend}/getStudentNames?token=${token}`)
        const responseTeachers = await fetch(`${backend}/getTeacherNames?token=${token}`)
        const responseEtudes = await fetch(`${backend}/getEtudes?token=${token}`)
        const tempStudents = await responseStudents.json();
        const tempTeachers = await responseTeachers.json();
        const tempEtudes = await responseEtudes.json();
        setStudents(tempStudents.data)
        setTeachers(tempTeachers.data)
        setEtudes(tempEtudes.data)
    }

        
    const selectBoxStudent = students.map(data => {
        return (
          <option value={data.STUDENTID} key={data.STUDENTID}>{data.STUDENTNAME}</option>
        )
    })
    const selectBoxTeachers = teachers.map(data => {
        return (
          <option value={data.TEACHERID} key={data.TEACHERID}>{data.TEACHERNAME}</option>
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
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Birebiri Veren Öğretmen:</label>
                        <select className="form-control" id="usrName" value={addTeacher} onChange={(e) => setAddTeacher(e.target.value)}>
                        <option selected value="">Öğretmeni Seçiniz...</option>
                            {selectBoxTeachers}
                        </select><br/>
                        <label htmlFor="usrStudent">Birebiri Alan Öğrenci:</label>
                        <select className="form-control" id="usrStudent" value={addStudent} onChange={(e) => setAddStudent(e.target.value)}>
                        <option selected value="">Öğrenciyi Seçiniz...</option>
                            {selectBoxStudent}
                        </select><br/>
                        <div className="row ">
                            <div className="col">
                                <label htmlFor  ="usrDatetime">Birebirin Tarihi:</label>
                            </div>
                            <div className="col">
                                <input type="datetime-local" id="usrDatetime" value={time} onChange={updateTime}/><br/>
                            </div>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Birebiri Ekle</button>
                        </div>
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                    <DataTable
                        title="Etüt Listesi"
                        columns={columns}
                        data={etudes}
                        selectableRows
                        noHeader={false}
                        contextActions={contextActions}
                        highlightOnHover={true}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        selectableRowsHighlight={true}
                    />
                </div>
            </div>
        </div>)
}

export default EditEtudes;