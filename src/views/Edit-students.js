import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const EditStudents = () => {

    const [students, setStudents] = useState([])
    const [classes, setClasses] = useState([])
    const [addName, setAddName] = useState([])
    const [addClass, setAddClass] = useState()
    const [addNo, setAddNo] = useState([])
    const [addTel, setAddTel] = useState([])
    const [completed, setCompleted] = useState("0")
    const [error, setError] = useState('')

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
        }
    ]


    useEffect(() => {
        getSelections()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getSelections = () => {
        axios(reqConfig('students/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    console.log(js.data)
                    setStudents(js.data);
                    setError()
                } else {
                    setStudents([])
                    setError(js.message)
                }
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

        axios(reqConfig('classes/'))
            .then((response2) => {
                var js2 = JSON.parse(JSON.stringify(response2.data))
                if (js2.status) {
                    setClasses(js2.data);
                    setError()
                } else {
                    setClasses([])
                    setError()
                }
                setCompleted(1)
            })
            .catch((error2) => {
                console.log(error2);
                setCompleted(0)
            })

        

    }
    const updateName = e => {
        setAddName(e.target.value)
    }
    const updateNo = e => {
        setAddNo(e.target.value)
    }
    const updateTel = e => {
        setAddTel(e.target.value)
    }
    const selectBox = classes.map(data => {
        return (
            <option value={data.CLASSID} key={data.CLASSID}>{data.CLASSNAME}</option>
        )
    })

    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            name: addName,
            no: addNo,
            tel: addTel,
            classid: addClass
        }
        axios(reqConfig('students/', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setError()
                } else {
                    setError(js.message.sqlMessage)
                    console.log(js)
                }
                getSelections()
            })
            .catch((error) => {
                console.log(error);
                getSelections()
            });
        setAddName('')
        setAddNo('')
        setAddTel('')

    }

    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`students/${row.STUDENTID}`, 'delete'))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        setError()
                    } else {
                        setStudents([])
                        setError(js.message)
                    }
                    getSelections()
                })
                .catch((error) => {
                    console.log(error);
                    getSelections()
                });
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Öğrencinin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateName} value={addName} placeholder="Öğrenci Adı" /><br />
                        <label htmlFor="usrClass">Öğrencinin Sınıfı:</label>
                        <select className="form-control" id="usrClass" value={addClass} onChange={(e) => setAddClass(e.target.value)}>
                            <option defaultValue={null}>Sınıfı işaretleyin...</option>
                            {selectBox}
                        </select><br />
                        <label htmlFor="usrNo">Öğrenci No:</label>
                        <input type="text" className="form-control" onChange={updateNo} value={addNo} placeholder="Öğrenci Okul No" /><br />
                        <label htmlFor="usrParentTel">Velinin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="text" className="form-control" onChange={updateTel} value={addTel} id="usrParentTel" placeholder="5XXXXXXXXX" aria-describedby="inputGroupPrepend3" />
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Öğrenci Ekle</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1  ?
                        <Table
                            columns={columns}
                            allData={students}
                            delFunction={del}
                            title="Öğrenci Listesi"
                            getFunction={getSelections}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditStudents
