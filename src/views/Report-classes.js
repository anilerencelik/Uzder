import React, {useState, useEffect} from 'react';

const backend = "http://localhost:2000"

const ReportClasses = () => {
  const token = localStorage.getItem('token')

  const [classes, setClasses] = useState([])
  const [getClassID, setGetClassID] = useState("")
  const [currClass, setCurrClass] = useState([])
  const [crossVN, setCrossVN] = useState("hidden")
  const [report, setReport] = useState({})
  var iterate =  0;

  
  const send = async () => {
    if (getClassID !== ""){
      const responseClass = await fetch(`${backend}/getClass?token=${token}&id=${getClassID}`)
      const tempClass  = await responseClass.json();
      setCurrClass(tempClass.data)
      const responseReport = await fetch(`${backend}/getClass4Report?token=${token}&classid=${getClassID}`)
      const tempReport  = await responseReport.json();
      setReport(tempReport.data)
      await setCrossVN("visible")  
    }
  } 
  
  useEffect(() => {
    getselections()
    
  }, [])
  
  const getselections = async() => {
      const responseClasses = await fetch(`${backend}/getClasses?token=${token}`)
      const tempClasses = await responseClasses.json();
      setClasses(tempClasses.data)
  }

  const selectBoxTeachers = classes.map(data => {
    return (
      <option value={data.CLASSID} key={data.CLASSID}>{data.CLASSNAME}</option>
    )
  })

  const lessons = crossVN ==="visible"? report[5].map(data => {
    return (
      <li>{data.LESSONNAME}</li>
    )
  }): 0
  
  
  
  return(
    <div className="container-fluid">{console.log(localStorage.getItem("x"))}
      <div className="row">
        <div className="col-md-4 ">
            <form className="form-group">
                <label htmlFor="usrName">Raporu Hazırlanacak Sınıfı Seçiniz:</label>
                <select className="form-control" id="usrName" value={getClassID} onChange={(e) => setGetClassID(e.target.value)}>
                <option selected value="">Sınıfı Seçiniz...</option>
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
          {crossVN==="visible" ? report[5].map(data => {console.log(data.LESSONNAME)}): console.log()}
            <div className="card-header ">{currClass.map(r => r.CLASSNAME)}</div>
            <div className="card-body text-secondary">
              <h5 className="card-title">Sınıfın Raporu:</h5>            
              <ul className="list-group">
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Sınıfa Verilen Ödev Sayısı
                  <span className="badge badge-info badge-pill">{(crossVN==="visible") ? report[0][0].HWNUMBER : 0}</span>
                </li>
                <li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                  Sınıfa Verilen Birebir Sayısı
                  <span className="badge badge-success badge-pill">{(crossVN==="visible") ? report[4][0].ALLETUDERECORD : 0}</span>
                </li>
                <br/>
                <p>Sınıfın Sorumlu Olduğu Dersler:</p>
                <ul >{lessons}</ul>
                                
              </ul>
              <br/>
                <div className="row justify-content-around" >
                  <h5 className="col-auto" >Ödevlerin Yapılma Yüzdesi: %{(crossVN==="visible") ? ((report[1][0].TRUEHW / report[2][0].ALLHWRECORD)*100).toFixed(2)  : 0}</h5>
                  <h5 className="col-auto" >Birebire Katılma Yüzdesi: %{(crossVN==="visible") ? ((report[3][0].TRUEETUDE / report[4][0].ALLETUDERECORD)*100).toFixed(2)  : 0}</h5>
                </div>


            </div>
          </div>



        </div>
      </div>
    </div>)
}

export default ReportClasses;