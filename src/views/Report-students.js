import React, {useState, useEffect} from 'react';

const backend = "http://localhost:2000"

const ReportStudent = () => {
  const token = localStorage.getItem('token')

  const [schoolNo, setSchoolNo] = useState('')
  const [getStudentID, setGetStudentID] = useState('')
  const [validNumber, setValidNumber] = useState("hidden")
  const [crossVN, setCrossVN] = useState("hidden")
  const [student, setStudent] = useState([])
  const [trueHomework, setTrueHomework] = useState(0)
  const [falseHomework, setFalseHomework] = useState(0)
  const [trueEtude, setTrueEtude] = useState(0)
  const [falseEtude, setFalseEtude] = useState(0)
  const [avgEtude, setAvgEtude] = useState(0)
  const [avgHomework, setAvgHomework] = useState(0)


  const updateSchoolNo = e => {
    setSchoolNo(e.target.value)
  }
  const send = async () => {
    const responseStudentID = await fetch(`${backend}/getStudentID?token=${token}&id=${schoolNo}`)
    const tempStudentID  = await responseStudentID.json();
    if(tempStudentID.data.length !== 0){
      setGetStudentID(tempStudentID.data[0].STUDENTID)
      
      setValidNumber("hidden")
      setCrossVN("visible")
    }else{
      setValidNumber("visible")
    }
  } 

  useEffect(() => {
    getReport()
  }, [getStudentID])

  const getReport = async() => {
    if(getStudentID !== ''){
      const responseStudent = await fetch(`${backend}/getStudent4Report?token=${token}&studentid=${getStudentID}`)
      const tempStudent  = await responseStudent.json();
      setStudent(tempStudent.data)
      const responseTH = await fetch(`${backend}/getStudent4ReportProp1?token=${token}&studentid=${getStudentID}`)
      const tempTH  = await responseTH.json();
      setTrueHomework(tempTH.data)
      const responseFH = await fetch(`${backend}/getStudent4ReportProp2?token=${token}&studentid=${getStudentID}`)
      const tempFH  = await responseFH.json();
      setFalseHomework(tempFH.data)
      const responseTE = await fetch(`${backend}/getStudent4ReportProp3?token=${token}&studentid=${getStudentID}`)
      const tempTE  = await responseTE.json();
      setTrueEtude(tempTE.data)
      const responseFE = await fetch(`${backend}/getStudent4ReportProp4?token=${token}&studentid=${getStudentID}`)
      const tempFE = await responseFE.json();
      setFalseEtude(tempFE.data)
      const responseAVGE = await fetch(`${backend}/avgEtude?token=${token}&studentid=${getStudentID}`)
      const tempAVGE = await responseAVGE.json();
      setAvgEtude((tempAVGE.data[0].ETUTSONUC * 100))
      const responseAVGH = await fetch(`${backend}/avgHomework?token=${token}&studentid=${getStudentID}`)
      const tempAVGH = await responseAVGH.json();
      setAvgHomework((tempAVGH.data[0].HOMEWORKSONUC * 100))
    }
  }


  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 ">
            <form className="form-group">
                <label htmlFor="usrName">Öğrencinin Okul Numarasını Girin:</label>
                <input type="number" className="form-control" id="usrName" onChange={updateSchoolNo} value={schoolNo} placeholder="Okul Numarası"/><br/>
                
                <div className="d-flex justify-content-center">
                    <button type="button" onClick={send} className="btn btn-secondary">Raporu Getir</button>
                </div>
                <p style={{color:"red", visibility:validNumber, paddingTop:"20px"} }>Geçerli Bir Okul Numarası Giriniz...</p>
            </form>
            <br/>
        </div>
        <div className="col auto">
          <div className="card border-secondary mb-3" style={{visibility:crossVN}}>
            <div className="card-header">{student.map(r => r.STUDENTNAME)}</div>
            <div className="card-body text-secondary">
              <h5 className="card-title">Öğrencinin Raporu:</h5>            
              <ul className="list-group">
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Yapılan birebir sayısı
                  <span className="badge badge-success badge-pill">{(crossVN==="visible" && trueEtude.length ===1) ? trueEtude.map(r => r.YAPILANETUT): 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Yapılmayan birebir sayısı
                  <span className="badge badge-danger badge-pill">{(crossVN==="visible" && falseEtude.length ===1) ? falseEtude.map(r => r.YAPILMAYANETUT): 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Teslim edilen ödev sayısı
                  <span className="badge badge-success badge-pill">{(crossVN==="visible" && trueHomework.length ===1) ? trueHomework.map(r => r.YAPILANODEV): 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Teslim edilmeyen ödev sayısı
                  <span className="badge badge-danger badge-pill">{(crossVN==="visible" && falseHomework.length ===1) ? falseHomework.map(r => r.YAPILMAYANODEV): 0}</span>
                </li>
              </ul>
              <br/>
              <div className="row justify-content-around">
                <h5>Etüt Başarı Yüzdesi: %{avgEtude.toFixed(2)}</h5>
                <h5>Ödev Başarı Yüzdesi: %{avgHomework.toFixed(2)}</h5>
              </div>
              <div className="d-flex justify-content-center">
                <h5>Genel Başarı Yüzdesi: %{((avgEtude + avgHomework) / 2).toFixed(2)}</h5>
              </div>


            </div>
            <div className="card-footer">
              <div className="row justify-content-between">
                <div className="col-4" style={{textAlign:"left"}}>{student.map(r => r.CLASSNAME)}</div>
                <div className="col-4" style={{textAlign:"center"}}>Veli Tel: +90 {student.map(r => r.PARENTTELNO)}</div>
                <div className="col-4" style={{textAlign:"right"}}>{student.map(r => r.SCHOOLNO)}</div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>)

}

export default ReportStudent;