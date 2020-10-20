import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const EditLessons = () => {

    const columns = [
        {
            name: 'Ders Adı',
            selector: 'LESSONNAME',
            sortable: true,
            grow: 2
        }
    ];

    const [lessons, setLessons] = useState([])
    const [completed, setCompleted] = useState(0)
    const [addLessonName, setAddLessonName] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        getLessons()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const getLessons = () => {
        axios(reqConfig('lessons/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setLessons(js.data);
                    setError('')
                } else {
                    setLessons([])
                    setError(js.message.sqlMessage)
                }
                setCompleted(1)
            })
            .catch((error) => {
                console.log(error);
                setCompleted(1)
            });
    }
    const updateLessonName = e => {
        setAddLessonName(e.target.value)
    }
    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            name: addLessonName
        }
        axios(reqConfig('lessons/', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setError('')
                } else {
                    setLessons([])
                    setError(js.message.sqlMessage)
                }
                getLessons()
            })
            .catch((error) => {
                console.log(error);
                getLessons()
            });
        setAddLessonName('')
    }
    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`lessons/${row.LESSONID}`, 'delete'))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        setError('')
                    } else {
                        setLessons([])
                        setError(js.message.sqlMessage)
                    }
                    getLessons()
                })
                .catch((error) => {
                    console.log(error);
                    getLessons()
                });
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Dersin Adı:</label>
                        <input type="text" className="form-control" id="usrName" value={addLessonName} onChange={updateLessonName} placeholder="Tüm ders isimleri farklı olmalıdır." /><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Dersi Ekle</button>
                        </div>
                        <br /><br />
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1 ?
                        <Table
                            columns={columns}
                            allData={lessons}
                            delFunction={del}
                            title="Ders Listesi"
                            getFunction={getLessons}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditLessons;
