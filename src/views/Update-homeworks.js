import React, {useState, useEffect} from 'react';
import DataTable from 'react-data-table-component';

const backend = "http://localhost:2000"


const UpdateHomework = () => {
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
            window.location.reload(false);
          }
        };
    
        return <button type={"button"} className="btn btn-danger" key="delete" onClick={handleDelete}>Ödev Durumunu Değiştir</button>;
    }, [data, selectedRows, toggleCleared]);

    const del = async (row) => {
        var NextState = "Yapılmadı";
        if(row.STATE !== "Yapıldı"){
            NextState = "Yapıldı";    
        }
        const answer = await fetch(`${backend}/updateHomework?homeworkid=${row.HOMEWORKID}&studentid=${row.STUDENTID}&nextState=${NextState}`)
        console.log(answer)
    }

    const [homeworks, setHomeworks] = useState([])
    const [getHomework, setGetHomework] = useState([])

    useEffect( () => {
        getSelections()
    },[])

    const getSelections = async () => {
        const responseHomeworks = await fetch(`${backend}/getHomeworks`)
        const tempHomeworks = await responseHomeworks.json();
        setHomeworks(tempHomeworks.data)
    }

    const send = async () => {
        const responseUHomeworks = await fetch(`${backend}/updateHomeworks?id=${getHomework}`)
        const tempUHomeworks = await responseUHomeworks.json();
        setData(tempUHomeworks.data)
    }

    const selectBox = homeworks.map(homework => {
        return (
          <option value={homework.HOMEWORKID} key={homework.HOMEWORKID}>{homework.NAME}</option>
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
            name: 'Sınıf Adı',
            selector: 'CLASSNAME',
            sortable: true,
        },{
            name: 'Ödev Durumu',
            selector: 'STATE',
            sortable: true,
        },
    ];

    return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-4 ">
                <form className="form-group">
                    <label htmlFor="usrName">Verilen Ödevi Seçiniz</label>
                    <select className="form-control" id="usrTeacher" value={getHomework} onChange={(e) => setGetHomework(parseInt(e.target.value))}>
                    <option selected value="">İşlem Yapılacak Ödevi Seçin...</option>
                        {selectBox}
                    </select><br/>
                    <div className="d-flex justify-content-center">
                        <button type="button" onClick={send} className="btn btn-secondary">Kayıtları Getir</button>
                    </div>
                </form>
                <br/>
            </div>
            <div className="col auto">
                <DataTable
                    title="Ödev Kontrol Listesi"
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

export default UpdateHomework;