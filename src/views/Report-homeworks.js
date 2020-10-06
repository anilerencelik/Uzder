import React, {useState, useEffect} from 'react';

const backend = "http://localhost:2000"

const ReportHomework = () => {
  const token = localStorage.getItem('token')

  const [homeworks, setHomeworks] = useState([])
  const [getHomeworkID, setGetHomeworkID] = useState("")
  const [homework, setHomework] = useState([])
  const [crossVN, setCrossVN] = useState("hidden")
  const [report, setReport] = useState({})



  const send = async () => {
    if (getHomeworkID !== ""){
      const responseHomework = await fetch(`${backend}/getHomework?token=${token}&id=${getHomeworkID}`)
      const tempHomework  = await responseHomework.json();
      setHomework(tempHomework.data)
      const responseReport = await fetch(`${backend}/getHomework4Report?token=${token}&homeworkid=${getHomeworkID}`)
      const tempReport  = await responseReport.json();
      setReport(tempReport.data)
      await setCrossVN("visible")
    }
  } 

  useEffect(() => {
    getselections()
    
  }, [])

  const getselections = async() => {
    const responseHomeworks = await fetch(`${backend}/getHomeworks?token=${token}`)
    const tempHomeworks  = await responseHomeworks.json();
    setHomeworks(tempHomeworks.data)
  }

  const selectBoxTeachers = homeworks.map(data => {
    return (
      <option value={data.HOMEWORKID} key={data.HOMEWORKID}>{data.NAME}</option>
    )
})



  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 ">
            <form className="form-group">
                <label htmlFor="usrName">Raporu Hazırlanacak Ödevi Seçiniz:</label>
                <select className="form-control" id="usrName" value={getHomeworkID} onChange={(e) => setGetHomeworkID(e.target.value)}>
                <option selected value="">Ödevi Seçiniz...</option>
                    {selectBoxTeachers}
                </select><br/>
                <div className="d-flex justify-content-center">
                    <button type="button" onClick={send} className="btn btn-secondary">Raporu Getir</button>
                </div>
            </form>
            <br/>
        </div>
        <div className="col auto">
          <div className="card border-secondary mb-3" style={{visibility:crossVN}}>
            <div className="card-header ">{homework.map(r => r.NAME)}</div>
            <div className="card-body text-secondary">
              <h5 className="card-title">Ödevin Raporu:</h5>            
              <ul className="list-group">
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Ödevi Alan Öğrenci Sayısı
                  <span className="badge badge-info badge-pill">{(crossVN==="visible") ? report[0][0].ALLHW: 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Ödevi Teslim Eden Öğrenci Sayısı
                  <span className="badge badge-success badge-pill">{(crossVN==="visible") ? report[1][0].TRUEHW: 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Ödevi Teslim Etmeyen Öğrenci Sayısı
                  <span className="badge badge-danger   badge-pill">{(crossVN==="visible") ? report[0][0].ALLHW - report[1][0].TRUEHW: 0}</span>
                </li>                
              </ul>
              <br/>
                <div className="row justify-content-around" >
                <h5 className="col-auto" >Ödevlerin Başarı Yüzdesi: %{(crossVN==="visible") ? ((report[1][0].TRUEHW / report[0][0].ALLHW)*100).toFixed(2)  : 0}</h5>
              </div>


            </div>
            <div className="card-footer">
              <div className="row justify-content-between">
                <div className="col-4" style={{textAlign:"left"}}>{homework.map(r => r.TEACHERNAME)}</div>
                <div className="col-4" style={{textAlign:"center"}}>{homework.map(r => r.LESSONNAME)}</div>
                <div className="col-4" style={{textAlign:"right"}}>{homework.map(r => r.DEADLINE)}</div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>)
}

export default ReportHomework;