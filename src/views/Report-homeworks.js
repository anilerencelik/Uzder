import React, { useState, useEffect } from 'react'
import reqConfig from '../utils/request'
import axios from 'axios';

const ReportHomework = () => {

    const [homeworks, setHomeworks] = useState([])
    const [getHomeworkID, setGetHomeworkID] = useState("")
    const [homework, setHomework] = useState([])
    const [crossVN, setCrossVN] = useState("hidden")
    const [report, setReport] = useState({})

    useEffect(() => {
        getHomeworks()
    }, [])

    const send = async (e) => {
        e.preventDefault()
        const data = {
            homeworkid: getHomeworkID
        }
        axios(reqConfig('reports/homework', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setOptions(js.data)
                } else {
                    setHomework([])
                    setReport([])
                    setCrossVN("hidden")
                }
            })
            .catch((error) => {
                console.log(error);
                setCrossVN("hidden")
            });
    }

    const setOptions = (arr) => {
        setHomework(arr[0])
        setReport(arr.slice(1))
        setCrossVN("visible")
    }

    const getHomeworks = async () => {
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


    const selectBoxTeachers = homeworks.map(data => {
        return (
            <option value={data.HOMEWORKID} key={data.HOMEWORKID}>{data.NAME}</option>
        )
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Raporu Hazırlanacak Ödevi Seçiniz:</label>
                        <select className="form-control" id="usrName" value={getHomeworkID} onChange={(e) => setGetHomeworkID(e.target.value)}>
                            <option defaultValue={null}>Ödevi Seçiniz...</option>
                            {selectBoxTeachers}
                        </select><br />
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-secondary">Raporu Getir</button>
                        </div>
                    </form>
                    <br />
                </div>
                <div className="col auto">
                    <div className="card border-secondary mb-3" style={{ visibility: crossVN }}>
                        <div className="card-header " style={{ textAlign: "center" }} >{homework.map(r => r.NAME)}</div>
                        <div className="card-body text-secondary">
                            <h5 className="card-title">Ödevin Raporu:</h5>
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Ödevi Alan Öğrenci Sayısı
                                    <span className="badge badge-info badge-pill">{(crossVN === "visible") ? report[0][0].ALLHW : 0}</span>
                                </li>
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Ödevi Teslim Eden Öğrenci Sayısı
                                    <span className="badge badge-success badge-pill">{(crossVN === "visible") ? report[1][0].TRUEHW : 0}</span>
                                </li>
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Ödevi Teslim Etmeyen Öğrenci Sayısı
                                    <span className="badge badge-danger   badge-pill">{(crossVN === "visible") ? report[0][0].ALLHW - report[1][0].TRUEHW : 0}</span>
                                </li>
                            </ul>
                            <br />
                            <div className="row justify-content-around" >
                                <h5 className="col-auto" >Ödevlerin Başarı Yüzdesi: %{(crossVN === "visible") ? ((report[1][0].TRUEHW / report[0][0].ALLHW) * 100).toFixed(2) : 0}</h5>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row justify-content-between">
                                <div className="col-4" style={{ textAlign: "left" }}>{homework.map(r => r.TEACHERNAME)}</div>
                                <div className="col-4" style={{ textAlign: "center" }}>{homework.map(r => r.LESSONNAME)}</div>
                                <div className="col-4" style={{ textAlign: "right" }}>{homework.map(r => r.DEADLINE)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportHomework
