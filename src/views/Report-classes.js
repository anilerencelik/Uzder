import React, { useState, useEffect } from 'react'
import reqConfig from '../utils/request'
import axios from 'axios';

const ReportClass = () => {

  const [classes, setClasses] = useState([])
  const [getClassID, setGetClassID] = useState("")
  const [currClass, setCurrClass] = useState([])
  const [crossVN, setCrossVN] = useState("hidden")
  const [report, setReport] = useState({})

  useEffect(() => {
    getClasses()
  }, [])

  const send = async (e) => {
    e.preventDefault()
    const data = {
      classid: getClassID
    }
    axios(reqConfig('reports/class', 'post', data))
      .then((response) => {
        var js = JSON.parse(JSON.stringify(response.data))
        if (js.status) {
          setOptions(js.data)
        } else {
          setCurrClass([])
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
    setCurrClass(arr[0])
    setReport(arr.slice(1))
    setCrossVN("visible")
  }

  const getClasses = async () => {
    axios(reqConfig("classes/"))
      .then((response) => {
        var js = JSON.parse(JSON.stringify(response.data))
        if (js.status) {
          setClasses(js.data)
        } else {
          setClasses([])
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const selectBoxTeachers = classes.map(data => {
    return (
      <option value={data.CLASSID} key={data.CLASSID}>{data.CLASSNAME}</option>
    )
  })

  const lessons = crossVN === "visible" ? report[5].map(data => {
    return (
      <li key={data.LESSONNAME}>{data.LESSONNAME}</li>
    )
  }) : 0

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 ">
          <form className="form-group" onSubmit={send}>
            <label htmlFor="usrName">Raporu Hazırlanacak Sınıfı Seçiniz:</label>
            <select className="form-control" id="usrName" value={getClassID} onChange={(e) => setGetClassID(e.target.value)}>
              <option defaultValue={null}>Sınıfı Seçiniz...</option>
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
            <div className="card-header " style={{ textAlign: "center" }}>{currClass.map(r => r.CLASSNAME)}</div>
            <div className="card-body text-secondary">
              <h5 className="card-title">Sınıfın Raporu:</h5>
              <ul className="list-group">
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Sınıfa Verilen Ödev Sayısı
                  <span className="badge badge-info badge-pill">{(crossVN === "visible") ? report[0][0].HWNUMBER : 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Sınıfa Verilen Birebir Sayısı
                  <span className="badge badge-success badge-pill">{(crossVN === "visible") ? report[4][0].ALLETUDERECORD : 0}</span>
                </li>
                <br />
                <p>Sınıfın Sorumlu Olduğu Dersler:</p>
                <ul >{lessons}</ul>
              </ul>
              <br />
              <div className="row justify-content-around" >
                <h5 className="col-auto" >Ödevlerin Yapılma Yüzdesi: %{(crossVN === "visible") ? ((report[1][0].TRUEHW / report[2][0].ALLHWRECORD) * 100).toFixed(2) : 0}</h5>
                <h5 className="col-auto" >Birebire Katılma Yüzdesi: %{(crossVN === "visible") ? ((report[3][0].TRUEETUDE / report[4][0].ALLETUDERECORD) * 100).toFixed(2) : 0}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportClass
