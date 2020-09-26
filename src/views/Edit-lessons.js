import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"

const EditLessons = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.LESSONNAME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.LESSONID)})
            window.location.reload(false);
          }
        };    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
    }, [data, selectedRows, toggleCleared]);



    const [lessons, setLessons] = useState([])
    const [addLessonName, setAddLessonName] = useState('')
    useEffect( () => {
        getLessons()
    },[])
    const getLessons = async () => {
        const response = await fetch(`${backend}/getLessons`)
        const temp = await response.json()
        setLessons(temp.data)
    }
    const columns = [{
        name: 'Ders Adı',
        selector: 'LESSONNAME',
        sortable: true,
    }]
    const updateLessonName = e => {
        setAddLessonName(e.target.value)
        console.log(addLessonName)
    }
    const send = async () => {
        const answer = await fetch(`${backend}/addLesson?name=${addLessonName}`)
        console.log(answer)
    }
    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteLesson?id=${id}`)
        console.log(answer)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Dersin Adı:</label>
                        <input type="text" className="form-control" id="usrName" value={addLessonName} onChange={updateLessonName} placeholder="Tüm ders isimleri farklı olmalıdır."/><br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Dersi Ekle</button>
                        </div>
                        <br/><br/>   
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                <DataTable
                    title="Ders Listesi"
                    columns={columns}
                    data={lessons}
                    selectableRows
                    highlightOnHover={true}
                    contextActions={contextActions}
                    onSelectedRowsChange={handleRowSelected}
                    clearSelectedRows={toggleCleared}
                />
                </div>
            </div>
        </div>
        )
}

export default EditLessons;