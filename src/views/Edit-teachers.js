import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const EditTeachers = () => {

    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')
    const [teachers, setTeachers] = useState([])
    const [lessons, setLessons] = useState([])
    const [addName, setAddName] = useState([])
    const [addBranch, setAddBranch] = useState()
    const [addTel, setAddTel] = useState([])
    const updateName = e => {
        setAddName(e.target.value)
    }
    const updateTel = e => {
        setAddTel(e.target.value)
    }


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
    ]


    useEffect(() => {
        getSelections()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getSelections = () => {
        axios(reqConfig('teachers/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setTeachers(js.data);
                    setError()
                } else {
                    setTeachers([])
                    setError(js.message)
                }
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

        axios(reqConfig('lessons/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setLessons(js.data);
                    setError()
                } else {
                    setLessons([])
                    setError()
                }
                setCompleted(1)
            })
            .catch((error) => {
                console.log(error);
                setCompleted(0)
            });

    }
    const selectBox = lessons.map(lesson => {
        return (
            <option value={lesson.LESSONID} key={lesson.LESSONID}>{lesson.LESSONNAME}</option>
        )
    })

    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            name: addName,
            branch: addBranch,
            tel: addTel,
        }
        axios(reqConfig('teachers/', 'post', data))
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
        setAddTel('')
    }

    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`teachers/${row.TEACHERID}`, 'delete'))
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
                        <label htmlFor="usrName">Öğretmenin Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateName} value={addName} placeholder="Öğretmenin adını giriniz." /><br />
                        <label htmlFor="usrLesson">Öğretmenin Branşı:</label>
                        <select className="form-control" id="usrLesson" value={addBranch} onChange={(e) => setAddBranch(e.target.value)}>
                            <option defaultValue={null}>Öğretmen Branşını Seçiniz...</option>
                            {selectBox}
                        </select><br />
                        <label htmlFor="usrTel">Öğretmenin Telefon Numarası:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend3">+90</span>
                            </div>
                            <input type="number" className="form-control" id="usrTel" onChange={updateTel} value={addTel} placeholder="5XXXXXXXXX" aria-describedby="inputGroupPrepend3" />
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Öğretmeni Ekle</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1 ?
                        <Table
                            columns={columns}
                            allData={teachers}
                            delFunction={del}
                            title="Öğretmen Listesi"
                            getFunction={getSelections}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditTeachers
