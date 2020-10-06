import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"

const EditClasses = () => {
    const token = localStorage.getItem('token')

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.CLASSNAME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.CLASSID)})
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
    }, [data, selectedRows, toggleCleared]);

    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteClass?token=${token}&id=${id}`)
        console.log(answer)
    }



    const [selectedRowsL, setSelectedRowsL] = useState([]);
    const [toggleClearedL, setToggleClearedL] = useState(false);
    const [dataL, setDataL] = useState([]);
    const handleRowSelectedL = React.useCallback(state => {
    setSelectedRowsL(state.selectedRows);
    }, []);

    const contextActionsL = React.useMemo(() => {    
    }, [dataL, selectedRowsL, toggleClearedL]);


    
    const [lessons, setLessons] = useState([])
    const [classes, setClasses] = useState([])
    const [addClassName, setAddClassName] = useState([])

    useEffect( () => {
        getSelections()
        
    },[])

    const getSelections = async () => {
        const responseLesson = await fetch(`${backend}/getLessons?token=${token}`)
        const responseClass = await fetch(`${backend}/getClasses?token=${token}`)
        const tempLesson = await responseLesson.json();
        const tempClass = await responseClass.json();
        setLessons(tempLesson.data)
        setClasses(tempClass.data)
    }



    const columnsLeftTable = [
        {
          name: 'Ders Adı',
          selector: 'LESSONNAME',
          sortable: true,
        },
    ];
    const columnsRightTable = [
        {
          name: 'Sınıfın Adı',
          selector: 'CLASSNAME',
          sortable: true,
        },
    ];

    const send = async () => {
        const answer = await fetch(`${backend}/addClass?token=${token}&name=${addClassName}`)
        const responseClassID = await fetch(`${backend}/getLastClassID?token=${token}`)
        const tempClassID = await responseClassID.json();
        const addClassID = tempClassID.data[0].CLASSID;
        for (const r of selectedRowsL){
            await fetch(`${backend}/addClass/Lessons?token=${token}&lessonid=${r.LESSONID}&classid=${addClassID}`)
        }
        window.location.reload(false);
    }

    const updateClassName = e => {
        setAddClassName(e.target.value)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" >
                        <label htmlFor="usrName">Sınıfın Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateClassName} value={addClassName} placeholder="Tüm sınıf isimleri farklı olmalıdır."/>
                        <br/>
                        <label htmlFor="usrLessons">Sınıfın Alması Gereken Dersleri Seçin.</label>
                        <DataTable
                            columns={columnsLeftTable}
                            data={lessons}
                            selectableRows
                            noHeader={true}
                            fixedHeader={true}
                            highlightOnHover={true}
                            fixedHeaderScrollHeight="25vh"
                            contextActions={contextActionsL}
                            onSelectedRowsChange={handleRowSelectedL}
                            clearSelectedRows={toggleClearedL}
                            selectableRowsHighlight={true}
                        /><br/>
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={send} className="btn btn-secondary">Sınıfı Ekle</button>
                        </div>
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                    <DataTable
                        title="Sınıf Listesi"
                        columns={columnsRightTable}
                        data={classes}
                        selectableRows
                        noHeader={false}
                        highlightOnHover={true}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        selectableRowsHighlight={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditClasses;