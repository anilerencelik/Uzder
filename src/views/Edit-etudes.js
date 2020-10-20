import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const EditEtudes = () => {

    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')
    const [etudes, setEtudes] = useState([])
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])



    const [addTeacher, setAddTeacher] = useState()
    const [addStudent, setAddStudent] = useState()
    const [time, setTime] = useState('')
    const updateTime = e => {
        setTime(e.target.value)
    }


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
        }, {
            name: 'Durum',
            selector: 'STATE',
            sortable: true,
        },
    ]


    useEffect(() => {
        getSelections()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getSelections = () => {
        axios(reqConfig('etudes/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setEtudes(js.data);
                    setError()
                } else {
                    setEtudes([])
                    setError(js.message)
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
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

        axios(reqConfig('students/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setStudents(js.data);
                    setError()
                } else {
                    setStudents([])
                    setError()
                }
                setCompleted(1)
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

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

    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            teacherid: addTeacher,
            studentid: addStudent,
            date: time.split('T')[0],
            time: time.split('T')[1]
        }
        axios(reqConfig('etudes/', 'post', data))
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
    }

    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`etudes/${row.ETUDEID}`, 'delete'))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        setError()
                    } else {
                        setTeachers([])
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
                        <label htmlFor="usrName">Birebiri Veren Öğretmen:</label>
                        <select className="form-control" id="usrName" value={addTeacher} onChange={(e) => setAddTeacher(e.target.value)}>
                            <option defaultValue={null}>Öğretmeni Seçiniz...</option>
                            {selectBoxTeachers}
                        </select><br />
                        <label htmlFor="usrStudent">Birebiri Alan Öğrenci:</label>
                        <select className="form-control" id="usrStudent" value={addStudent} onChange={(e) => setAddStudent(e.target.value)}>
                            <option defaultValue={null}>Öğrenciyi Seçiniz...</option>
                            {selectBoxStudent}
                        </select><br />
                        <div className="row ">
                            <div className="col">
                                <label htmlFor="usrDatetime">Birebirin Tarihi:</label>
                            </div>
                            <div className="col">
                                <input type="datetime-local" id="usrDatetime" value={time} onChange={updateTime} /><br />
                            </div>
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Birebiri Ekle</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1 ?
                        <Table
                            columns={columns}
                            allData={etudes}
                            delFunction={del}
                            title="Birebir Listesi"
                            getFunction={getSelections}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditEtudes
