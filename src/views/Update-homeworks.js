import React, { useState, useEffect } from 'react'
import Table from "../components/Table.component";
import reqConfig from '../utils/request'
import axios from 'axios';

const UpdateHomework = () => {

    const [homeworks, setHomeworks] = useState([])
    const [getHomework, setGetHomework] = useState('')
    const [records, setRecords] = useState([])
    const [completed, setCompleted] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        getSelections()
    }, [])

    const getSelections = async () => {

        axios(reqConfig("homeworks/"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setHomeworks(js.data)
                } else {
                    setHomeworks([])
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
        axios(reqConfig(`update/homework/${getHomework}`, 'post'))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setError()
                    setRecords(js.data)
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
                    studentid: row.STUDENTID,
                    nextState: "Yapılmadı"
                }
            } else {
                data = {
                    studentid: row.STUDENTID,
                    nextState: "Yapıldı"
                }
            }
            axios(reqConfig(`update/homework/${row.HOMEWORKID}`, 'put', data))
                .then((response) => {
                    var js = JSON.parse(JSON.stringify(response.data))
                    if (js.status) {
                        setError()
                    } else {
                        setRecords([])
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
            grow: 3
        }, {
            name: 'Okul No',
            selector: 'SCHOOLNO',
            sortable: true,
        }, {
            name: 'Sınıf Adı',
            selector: 'CLASSNAME',
            sortable: true,
        }, {
            name: 'Ödev Durumu',
            selector: 'STATE',
            sortable: true,
        },
    ];


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Verilen Ödevi Seçiniz</label>
                        <select className="form-control" id="usrTeacher" value={getHomework} onChange={(e) => setGetHomework(parseInt(e.target.value))}>
                            <option defaultValue={null}>İşlem Yapılacak Ödevi Seçin...</option>
                            {selectBox}
                        </select><br />
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
                            allData={records}
                            delFunction={changeState}
                            title="Ödev Kontrol Listesi"
                            getFunction={getSelections}
                            buttonTitle="Durumu Değiştir"
                        /> : <h6>Detaylar için öğretmen ve tarihi seçip. Getir butonuna basınız.</h6>}
                </div>
            </div>
        </div>
    )
}

export default UpdateHomework
