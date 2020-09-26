import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"


const EditStudents = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [data, setData] = useState([]);
    const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
          if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.STUDENTNAME)}?`)) {
            setToggleCleared(!toggleCleared);
            selectedRows.forEach(r => {del(r.STUDENTID)})
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Kaldır</button>;
      }, [data, selectedRows, toggleCleared]);



    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])
    const [addName, setAddName] = useState([])
    const [addClass, setAddClass] = useState(1)
    const [addNo, setAddNo] = useState([])
    const [addTel, setAddTel] = useState([])
    const updateName = e => {
        setAddName(e.target.value)
    }
    const updateNo = e => {
        setAddNo(e.target.value)
    }
    const updateTel = e => {
        setAddTel(e.target.value)
    }
    const send = async () => {
        const answer = await fetch(`${backend}/addStudent?name=${addName}&no=${addNo}&tel=${addTel}&classid=${addClass}`)
        console.log(answer)
    }
    const del = async (id) => {
        const answer = await fetch(`${backend}/deleteStudent?id=${id}`)
        console.log(answer)
    }
    useEffect( () => {
        getSelections()
    },[])
    const getSelections= async () => {
        const responseClasses = await fetch(`${backend}/getClasses`)
        const responseStudents = await fetch(`${backend}/getStudentsWithClassname`)
        const tempClasses = await responseClasses.json();
        const tempStudents  = await responseStudents.json();
        setClasses(tempClasses.data)
        setStudents(tempStudents.data)
    }
    const selectBox = classes.map(data => {
        return (
          <option value={data.CLASSID} key={data.CLASSID}>{data.CLASSNAME}</option>
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
        }]
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Öğrencinin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateName} value={addName}/><br/>                
                        <label htmlFor="usrClass">Öğrencinin Sınıfı:</label>
                        <select className="form-control" id="usrClass" onChange={(e) => setAddClass(e.target.value)}>
                            {selectBox}
                        </select><br/>
                        <label htmlFor="usrNo">Öğrenci No:</label>
                        <input type="text" className="form-control" onChange={updateNo} value={addNo}/><br/>   
                        <label htmlFor="usrParentTel">Velinin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="text" className="form-control" onChange={updateTel} value={addTel} id="usrParentTel" placeholder="5XXXXXXXXX" aria-describedby="inputGroupPrepend3"/>
                        </div><br/>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Öğrenci Ekle</button>
                        </div>
                    </form>
                    <br/>
                </div>
                <div className="col auto">
                    <DataTable
                        title="Öğrenci Listesi"
                        columns={columns}
                        data={students}
                        selectableRows
                        noHeader={false}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                        clearSelectedRows={toggleCleared}
                        highlightOnHover={true}
                    />
                </div>
            </div>
        </div>    
        )

}

export default EditStudents;