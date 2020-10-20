import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';
import TableOld from "../components/Table";

const EditHomeworks = () => {

    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')
    const [teachers, setTeachers] = useState([])
    const [classes, setClasses] = useState([])
    const [homeworks, setHomeworks] = useState([])
    const [addTeacher, setAddTeacher] = useState()
    const [hwName, setHWName] = useState([])
    const [date, setDate] = useState('')
    const [sel, setSel] = useState([])

    const funcSelected = (rows) => {
        setSel(rows)
    }



    const updateHWName = e => {
        setHWName(e.target.value)
    }
    const updateDate = e => {
        setDate(e.target.value)
    }

    const columnsLeft = [
        {
            name: 'Sınıf Adı',
            selector: 'CLASSNAME',
            sortable: true
        }
    ];

    const columns = [
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

    useEffect(() => {
        getSelections()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getSelections = () => {
        axios(reqConfig('homeworks/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setHomeworks(js.data);
                    setError()
                } else {
                    setHomeworks([])
                    setError(js.message)
                }
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

        axios(reqConfig('classes/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setClasses(js.data);
                    setError()
                } else {
                    setClasses([])
                    setError()
                }
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

        axios(reqConfig('teachers/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setTeachers(js.data);
                    setError()
                } else {
                    setTeachers([])
                    setError()
                }
                setCompleted(1)
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

    }
    const selectBox = teachers.map(teacher => {
        return (
            <option value={teacher.TEACHERID} key={teacher.TEACHERID}>{teacher.TEACHERNAME}</option>
        )
    })

    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            name: hwName,
            teacherid: addTeacher,
            deadline: date
        }
        axios(reqConfig('homeworks/', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    sel.selectedRows.forEach(async (row) => {
                        axios(reqConfig(`homeworks/${js.data.insertId}`, "post", { classid: row.CLASSID }))
                            .then((responsehw) => {
                                var jshw = JSON.parse(JSON.stringify(responsehw.data))
                                if (jshw.status) {
                                    setError('')
                                }
                                else {
                                    setError('errorr')
                                }
                            })
                    })
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
    }

    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`homeworks/${row.HOMEWORKID}`, 'delete'))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        console.log(js)
                        setError()
                    } else {
                        setHomeworks([])
                        setError(js.message)
                    }
                    getSelections()
                })
                .catch((error) => {
                    console.log(error);
                    getSelections()
                });
        })
        setHWName('')
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group">
                        <label htmlFor="usrName">Ödevin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateHWName} value={hwName} placeholder="Tüm ödevlerin ismi farklı olmalıdır." /><br />
                        <label htmlFor="usrClass">Ödevin Verileceği Sınıfları Seçin.</label>
                        {completed === 1 ?
                            <TableOld
                                columns={columnsLeft}
                                dataparam={classes}
                                title="Birebir Listesi"
                                fixed={true}
                                test={funcSelected}
                            /> : <h6>Loading</h6>}
                        <br />
                        <label htmlFor="usrTeacher">Ödevi Veren Öğretmen:</label>
                        <select className="form-control" id="usrTeacher" value={addTeacher} onChange={(e) => setAddTeacher(parseInt(e.target.value))}>
                            <option defaultValue={null}>Öğretmeni Seçiniz...</option>
                            {selectBox}
                        </select><br />
                        <div className="row ">
                            <div className="col">
                                <label htmlFor="usrDate">Ödevin Kontrol Günü:</label>
                            </div>
                            <div className="col">
                                <input type="date" id="usrDate" value={date} onChange={updateDate} /><br />
                            </div>
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={send} className="btn btn-secondary">Ödevi Ekle</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1 ?
                        <Table
                            columns={columns}
                            allData={homeworks}
                            delFunction={del}
                            title="Ödev Listesi"
                            getFunction={getSelections}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditHomeworks
