import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';
import TableOld from "../components/Table";

const EditClasses = () => {

    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')
    const [lessons, setLessons] = useState('')
    const [classes, setClasses] = useState('')
    const [addClassName, setAddClassName] = useState('')
    const [sel, setSel] = useState([])

    const funcSelected = (rows) => {
        setSel(rows)
    }

    const updateClassName = e => {
        setAddClassName(e.target.value)
    }

    const columnsLeft = [
        {
            name: 'Ders Adı',
            selector: 'LESSONNAME',
            sortable: true
        }
    ];

    const columns = [
        {
            name: 'Sınıfın Adı',
            selector: 'CLASSNAME',
            sortable: true,
        }
    ];

    useEffect(() => {
        getSelections()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const getSelections = () => {
        axios(reqConfig('classes/'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setClasses(js.data);
                    setError()
                } else {
                    setClasses([])
                    setError(js.message.sqlMessage)
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


    const send = async (e) => {
        e.preventDefault()
        setCompleted(0)
        const data = {
            name: addClassName
        }
        axios(reqConfig('classes/', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    sel.selectedRows.forEach(async (row) => {
                        axios(reqConfig(`classes/${js.data.insertId}`, "post", { lessonid: row.LESSONID }))
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
        setAddClassName('')
    }

    const del = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            axios(reqConfig(`classes/${row.CLASSID}`, 'delete'))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        console.log(js)
                        setError()
                    } else {
                        setClasses([])
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
        <div className="container-fluid">{console.log(completed)}
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" >
                        <label htmlFor="usrName">Sınıfın Adı:</label>
                        <input type="text" className="form-control" id="usrName" onChange={updateClassName} value={addClassName} placeholder="Tüm sınıf isimleri farklı olmalıdır." />
                        <br />
                        <label htmlFor="usrLessons">Sınıfın Alması Gereken Dersleri Seçin.</label>
                        {completed === 1 ?
                            <TableOld
                                columns={columnsLeft}
                                dataparam={lessons}
                                fixed={true}
                                test={funcSelected}
                            /> : <h6>Loading</h6>}<br />
                        <div className="d-flex justify-content-center">
                            <button type="button" onClick={send} className="btn btn-secondary">Sınıfı Ekle</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    {error !== '' ? error : ''}
                    {completed === 1 ?
                        <Table
                            columns={columns}
                            allData={classes}
                            delFunction={del}
                            title="Sınıf Listesi"
                            getFunction={getSelections}
                        /> : <h6>Loading</h6>}
                </div>
            </div>
        </div>
    )
}

export default EditClasses
