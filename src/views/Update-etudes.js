import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"


const UpdateEtudes = () => {
    
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
            selectedRows.forEach(r => {del(r)})
            //window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Birebir Durumunu Değiştir</button>;
    }, [data, selectedRows, toggleCleared]);

    const del = async (row) => {
        var NextState = "Yapılmadı";
        if(row.STATE !== "Yapıldı"){
            NextState = "Yapıldı";    
        }
        const answer = await fetch(`${backend}/updateEtude?etudeid=${row.ETUDEID}&nextState=${NextState}`)
        console.log(answer)
    }



    const [teachers, setTeachers] = useState([])
    const [getTeacher, setGetTeacher] = useState([])
    const [etudes, setEtudes] = useState([])
    const [date, setDate] = useState('')

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseTeachers = await fetch(`${backend}/getTeachers`)
        const tempTeachers = await responseTeachers.json();
        setTeachers(tempTeachers.data)
    }

    const send = async () => {
        console.log(getTeacher, date)
        const responseUEtudes = await fetch(`${backend}/updateEtudes?teacherid=${getTeacher}&date=${date}`)
        const tempUEtudes = await responseUEtudes.json();
        setData(tempUEtudes.data)
    }

    const selectBox = teachers.map(teacher => {
        return (
          <option value={teacher.TEACHERID} key={teacher.TEACHERID}>{teacher.TEACHERNAME}</option>
        )
    })

    const columns = [
        {
            name: 'Öğrenci Adı',
            selector: 'STUDENTNAME',
            sortable: true,
            grow:3
        },{
            name: 'Okul No',
            selector: 'SCHOOLNO',
            sortable: true,
        },{
            name: 'Sınıf',
            selector: 'CLASSNAME',
            sortable: true,
        },{
            name: 'Birebir Tarihi',
            selector: 'DATE',
            sortable: true,
        },{
            name: 'Birebir Saati',
            selector: 'TIME',
            sortable: true,
        },{
            name: 'Birebir Durumu',
            selector: 'STATE',
            sortable: true,
        },
    ];

    const updateDate = e => {
        setDate(e.target.value)
    }

    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4 ">
                <form className="form-group">
                    <label htmlFor="usrName">Birebiri Yapan Öğretmen</label>
                    <select className="form-control" id="usrTeacher" value={getTeacher} onChange={(e) => setGetTeacher(e.target.value)}>
                    <option selected value="">İşlem Yapılacak Ödevi Seçin...</option>
                        {selectBox}
                    </select><br/>
                    <div className="row ">
                        <div className="col">
                            <label htmlFor="usrDate">Birebirin Tarihi:</label>
                        </div>
                        <div className="col">
                            <input type="date" id="usrDate" value={date} onChange={updateDate}/><br/>
                        </div>
                    </div><br/>                    
                    <div className="d-flex justify-content-center">
                        <button type="button" onClick={send} className="btn btn-secondary">Kayıtları Getir</button>
                    </div>
                </form>
                <br/>
            </div>
            <div className="col auto">
                <DataTable
                    title="Birebir Kontrol Listesi"
                    columns={columns}
                    data={data}
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

export default UpdateEtudes;