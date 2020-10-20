import React, { useState, useEffect } from 'react'
import reqConfig from '../utils/request'
import axios from 'axios';

const ReportTeacher = () => {

    const [teachers, setTeachers] = useState([])
    const [getTeacherID, setGetTeacherID] = useState("")
    const [crossVN, setCrossVN] = useState("hidden")
    const [report, setReport] = useState({})
    const [teacher, setTeacher] = useState([])

    useEffect(() => {
        getTeachers()
    }, [])

    const send = async (e) => {
        e.preventDefault()
        const data = {
            teacherid: getTeacherID
        }
        axios(reqConfig('reports/teacher', 'post', data))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setOptions(js.data)
                } else {
                    setTeacher([])
                    setCrossVN("hidden")
                }
            })
            .catch((error) => {
                console.log(error);
                setCrossVN("hidden")
            });
    }

    const setOptions = (arr) => {
        setTeacher(arr[0])
        setReport(arr.slice(1))
        setCrossVN("visible")
    }

    const getTeachers = async () => {
        axios(reqConfig("teachers/"))
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


    const selectBoxTeachers = teachers.map(data => {
        return (
            <option value={data.TEACHERID} key={data.TEACHERID}>{data.TEACHERNAME}</option>
        )
    })

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 ">
                    <form className="form-group" onSubmit={send}>
                        <label htmlFor="usrName">Raporu Hazırlanacak Öğretmeni Seçiniz:</label>
                        <select className="form-control" id="usrName" value={getTeacherID} onChange={(e) => setGetTeacherID(e.target.value)}>
                            <option defaultValue={null}>Öğretmeni Seçiniz...</option>
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
                        <div className="card-header">{teacher.map(r => r.TEACHERNAME)}</div>
                        <div className="card-body text-secondary">
                            <h5 className="card-title">Öğretmenin Raporu:</h5>
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Verilen birebir sayısı
                                    <span className="badge badge-success badge-pill">{(crossVN === "visible") ? report[0][0].TEACHERETUDE : 0}</span>
                                </li>
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Tüm birebirlerin %{(crossVN === "visible") ? ((report[0][0].TEACHERETUDE / report[1][0].ALLTEACHERETUDE) * 100).toFixed(2) : 0} 'si bu öğretmene ait.
                                </li>
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Verilen ödev sayısı
                                    <span className="badge badge-success badge-pill">{(crossVN === "visible") ? report[2][0].TEACHERHW : 0}</span>
                                </li>
                                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                                    Tüm birebirlerin %{(crossVN === "visible") ? ((report[2][0].TEACHERHW / report[3][0].ALLTEACHERHW) * 100).toFixed(2) : 0} 'si bu öğretmene ait.
                                    </li>
                            </ul>
                            <br />
                            <div className="row justify-content-around" >
                                <h5 className="col-auto" >Ödevlerin Yapılma Yüzdesi: %{(crossVN === "visible") ? ((report[4][0].TRUEHW / report[5][0].ALLHW) * 100).toFixed(2) : 0}</h5>
                                <h5 className="col-auto" >Birebire Katılma Yüzdesi: %{(crossVN === "visible") ? ((report[6][0].YAPILANTEACHERETUDE / report[0][0].TEACHERETUDE) * 100).toFixed(2) : 0}</h5>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row justify-content-around">
                                <div className="col-4" style={{ textAlign: "left" }}>Tel: +90 {teacher.map(r => r.TELNUMBER)}</div>
                                <div className="col-4" style={{ textAlign: "right" }}>{teacher.map(r => r.LESSONNAME)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportTeacher
