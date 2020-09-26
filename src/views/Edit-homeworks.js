import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"


const EditHomeworks = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.NAME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.HOMEWORKID)})
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
    }, [data, selectedRows, toggleCleared]);

    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteHomework?id=${id}`)
    }



    const [selectedRowsL, setSelectedRowsL] = useState([]);
    const [toggleClearedL, setToggleClearedL] = useState(false);
    const [dataL, setDataL] = useState([]);
    const handleRowSelectedL = React.useCallback(state => {
    setSelectedRowsL(state.selectedRows);
    }, []);

    const contextActionsL = React.useMemo(() => {    
    }, [dataL, selectedRowsL, toggleClearedL]);




    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])
    const [homeworks, setHomeworks] = useState([])
    const [addTeacher, setAddTeacher] = useState(1)
    const [hwName, setHWName] = useState([])
    const [date, setDate] = useState('')

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseTeachers = await fetch(`${backend}/getTeachers`)
        const responseClasses = await fetch(`${backend}/getClasses`)
        const responseHomeworks = await fetch(`${backend}/getHomeworks`)
        const tempTeachers = await responseTeachers.json();
        const tempClasses  = await responseClasses.json();
        const tempHomeworks = await responseHomeworks.json();
        setClasses(tempClasses.data)
        setTeachers(tempTeachers.data)
        setHomeworks(tempHomeworks.data)
    }

    const selectBox = teachers.map(teacher => {
        return (
          <option value={teacher.TEACHERID} key={teacher.TEACHERID}>{teacher.TEACHERNAME}</option>
        )
    })
    const updateHWName = e => {
        setHWName(e.target.value)
    }
    const updateDate = e => {
        setDate(e.target.value)
    }

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

    const send = async () => {
        await fetch(`${backend}/addHomework?name=${hwName}&teacherid=${addTeacher}&deadline=${date}`)
        const responseHWID = await fetch(`${backend}/getLastHWID`)
        const tempHWID = await responseHWID.json();
        const addHWID = tempHWID.data[0].HOMEWORKID;
        for (const r of selectedRowsL){
            await fetch(`${backend}/addHomework/Classes?homeworkid=${addHWID}&classid=${r.CLASSID}`)
        }
        window.location.reload(false);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group">
                        <label htmlFor="usrName">Ödevin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateHWName} value={hwName} placeholder="Tüm ödevlerin ismi farklı olmalıdır."/><br/>
                        <label htmlFor="usrClass">Ödevin Verileceği Sınıfları Seçin.</label>
                        <DataTable
                            columns={columns}
                            data={classes}
                            selectableRows
                            noHeader={true}
                            fixedHeader={true}
                            highlightOnHover={true}
                            fixedHeaderScrollHeight="25vh"
                            contextActions={contextActionsL}
                            onSelectedRowsChange={handleRowSelectedL}
                            clearSelectedRows={toggleClearedL}
                        /><br/>
                        <label htmlFor="usrTeacher">Ödevi Veren Öğretmen:</label>
                        <select className="form-control" id="usrTeacher" onChange={(e) => setAddTeacher(parseInt(e.target.value))}>
                            {selectBox}
                        </select><br/>
                        <div className="row ">
                            <div className="col">
                                <label htmlFor="usrDate">Ödevin Kontrol Günü:</label>
                            </div>
                            <div className="col">
                                <input type="date" id="usrDate" value={date} onChange={updateDate}/><br/>
                            </div>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={send} className="btn btn-secondary">Ödevi Ekle</button>
                        </div>
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                    <DataTable
                        title="Ödev Listesi"
                        columns={columnsRightTable}
                        data={homeworks}
                        selectableRows
                        noHeader={false}
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

export default EditHomeworks;