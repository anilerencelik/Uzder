import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"


const EditTeachers = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.TEACHERNAME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.TEACHERID)})
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
    }, [data, selectedRows, toggleCleared]);


    const [teachers, setTeachers] = useState([])
    const [lessons, setLessons] = useState([])
    const [addName, setAddName] = useState([])
    const [addBranch, setAddBranch] = useState(1)
    const [addTel, setAddTel] = useState([])
    const [debug, setDebug] = useState([])
    const updateName = e => {
        setAddName(e.target.value)
    }
    const updateTel = e => {
        setAddTel(e.target.value)
    }

    const send = async () => {
        const answer = await fetch(`${backend}/addTeacher?name=${addName}&branch=${addBranch}&tel=${addTel}`)
        setDebug(answer)
    }

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseLessons = await fetch(`${backend}/getLessons`)
        const responseTeachers = await fetch(`${backend}/getTeachers`)
        const tempLessons = await responseLessons.json();
        const tempTeachers = await responseTeachers.json();
        setLessons(tempLessons.data)
        setTeachers(tempTeachers.data)
    }

    const selectBox = lessons.map(lesson => {
        return (
          <option value={lesson.LESSONID} key={lesson.LESSONID}>{lesson.LESSONNAME}</option>
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
      

    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteTeacher?id=${id}`)
        console.log(answer)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Öğretmenin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateName} value={addName}/><br/>                
                        <label htmlFor="usrLesson">Öğretmenin Branşı:</label>
                        <select className="form-control" id="usrLesson" onChange={(e) => setAddBranch(e.target.value)}>
                            {selectBox}
                        </select><br/>
                        <label htmlFor="usrTel">Öğretmenin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="text" className="form-control" id="usrTel" onChange={updateTel} value={addTel} placeholder="5XXXXXXXXX" aria-describedby="inputGroupPrepend3"/>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Öğretmeni Ekle</button>
                        </div>
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                    <DataTable
                        title="Öğretmen Listesi"
                        columns={columns}
                        data={teachers}
                        selectableRows
                        noHeader={false}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        highlightOnHover={true}
                    />
                </div>
            </div>
        </div>)
}

export default EditTeachers;