import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const UpdateEtudes = () => {

    const [teachers, setTeachers] = useState([])
    const [getTeacher, setGetTeacher] = useState('')
    const [etudes, setEtudes] = useState([])
    const [date, setDate] = useState('')
    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        getSelections()
    }, [])

    const getSelections = async () => {

        axios(reqConfig("teachers/names"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setTeachers(js.data)
                } else {
                    setTeachers([])
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }

    const send = async (e) => {
        if (e) {
            e.preventDefault()
        }
        setCompleted(0)
        const data = {
            date: date
        }
        axios(reqConfig(`update/etude/${getTeacher}`, 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setError()
                    setEtudes(js.data)
                    setCompleted(1)
                } else {
                    setError(js.message.sqlMessage)
                    console.log(js)
                }
            })
            .catch((error) => {
                console.log(error);
                getSelections()
            });
    }

    const changeState = async (rows) => {
        setCompleted(0)
        rows.forEach(async (row) => {
            var data = {};
            if (row.STATE === "Yapıldı") {
                data = {
                    nextState: "Yapılmadı"
                }
            } else {
                data = {
                    nextState: "Yapıldı"
                }
            }
            axios(reqConfig(`update/etude/${row.ETUDEID}`, 'put', data))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        setError()
                    } else {
                        setTeachers([])
                        setError(js.message)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        setTimeout(() => {
            send()
        }, 500);
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
            grow: 3
        }, {
            name: 'Okul No',
            selector: 'SCHOOLNO',
            sortable: true,
        }, {
            name: 'Sınıf',
            selector: 'CLASSNAME',
            sortable: true,
        }, {
            name: 'Birebir Tarihi',
            selector: 'DATE',
            sortable: true,
        }, {
            name: 'Birebir Saati',
            selector: 'TIME',
            sortable: true,
        }, {
            name: 'Birebir Durumu',
            selector: 'STATE',
            sortable: true,
        },
    ];

    const updateDate = e => {
        setDate(e.target.value)
    }



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Birebiri Yapan Öğretmen</label>
                        <select className="form-control" id="usrTeacher" value={getTeacher} onChange={e => setGetTeacher(e.target.value)}>
                            <option defaultValue={null}>İşlem Yapılacak Ödevi Seçin...</option>
                            {selectBox}
                        </select><br />
                        <div className="row ">
                            <div className="col">
                                <label htmlFor="usrDate">Birebirin Tarihi:</label>
                            </div>
                            <div className="col">
                                <input type="date" id="usrDate" value={date} onChange={updateDate} /><br />
                            </div>
                        </div><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Kayıtları Getir</button>
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
                            delFunction={changeState}
                            title="Birebir Kontrol Listesi"
                            getFunction={getSelections}
                            buttonTitle="Durumu Değiştir"
                        /> : <h6>Detaylar için öğretmen ve tarihi seçip. Getir butonuna basınız.</h6>}
                </div>
            </div>
        </div>
    )
}

export default UpdateEtudes
