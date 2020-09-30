import React, {useState, useEffect} from 'react';
import Table from '../components/Table'

const backend = "http://localhost:2000"
 


const Panel = () => {

  const [classes, setClasses] = useState()
  const classColumns = [
    {
      name: 'Sınıf',
      selector: 'CLASSNAME',
      sortable: true
    }
  ];
  const [teachers, setTeachers] = useState()
  const teachersColumns = [
    {
      name: 'Öğretmen',
      selector: 'TEACHERNAME',
      sortable: true
    }
  ];
  const [lessons, setLessons] = useState()
  const lessonsColumns = [
    {
      name: 'Ders',
      selector: 'LESSONNAME',
      sortable: true
    }
  ];
  const [lastEtudes, setLastEtudes] = useState()
  const lastEtudesColumns = [
    {
      name: 'Öğretmen',
      selector: 'TEACHERNAME',
    },
    {
      name: 'Öğrenci',
      selector: 'STUDENTNAME',
    },
    {
      name: 'Tarih',
      selector: 'DATE',
    },
    {
      name: 'Saat',
      selector: 'TIME',
    }
  ];
  const [lastHomeworks, setLastHomeworks] = useState()
  const lastHomeworksColumns = [
    {
      name: 'Ders',
      selector: 'NAME'
    },
    {
      name: 'Ders',
      selector: 'TEACHERNAME'
    },
    {
      name: 'Ders',
      selector: 'DEADLINE'
    }
  ];
  const [statistics, setStatistics] = useState()


  useEffect(() => {
    getSelections()
  }, [])


  const getSelections = async() => {
    const responseClasses = await fetch(`${backend}/getClasses`)
    const tempClasses = await responseClasses.json()
    setClasses(tempClasses.data)
    const responseTeachers = await fetch(`${backend}/getTeacherNames`)
    const tempTeachers = await responseTeachers.json()
    setTeachers(tempTeachers.data)
    const responseLessons = await fetch(`${backend}/getLessons`)
    const tempLessons = await responseLessons.json()
    setLessons(tempLessons.data)
    const responseLastEtudes = await fetch(`${backend}/getPanelEtudes`)
    const tempLastEtudes = await responseLastEtudes.json()
    setLastEtudes(tempLastEtudes.data)
    const responseLastHomeworks = await fetch(`${backend}/getPanelHomeworks`)
    const tempLastHomeworks = await responseLastHomeworks.json()
    setLastHomeworks(tempLastHomeworks.data)
    const responseStatistics = await fetch(`${backend}/getPanelReports`)
    const tempStatistics = await responseStatistics.json()
    setStatistics(tempStatistics.data)
  }



    return(
      <div className="container-fluid" style={{paddingTop:"8px"}}>
        <div className="row">
          <div className="col-4">
            <h6 style={{paddingLeft:"16px"}}>Tüm Sınıflar</h6>
            <Table dataparam={classes} columns={classColumns}/>
          </div>
          <div className="col-4">
            <h6 style={{paddingLeft:"16px"}}>Tüm Öğretmenler</h6>
            <Table dataparam={teachers} columns={teachersColumns}/>
          </div>
          <div className="col-4">
            <h6 style={{paddingLeft:"16px"}}>Tüm Dersler</h6>
            <Table dataparam={lessons} columns={lessonsColumns}/>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-8">
            <h6 style={{paddingLeft:"16px"}}>Planlanan son 5 birebir</h6>
            <Table dataparam={lastEtudes} columns={lastEtudesColumns} noTableHead={false} fixedHeader={false}/>
          </div>
          <div className="col-4">
            <h6 style={{paddingLeft:"16px"}}>İstatistikler</h6>
            <ul class="list-group">
              <li class="list-group-item">Toplam Öğrenci Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[0][0].NUMBER}</li>
              <li class="list-group-item">Toplam Öğretmen Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[1][0].NUMBER}</li>
              <li class="list-group-item">Toplam Sınıf Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[2][0].NUMBER}</li>
              <li class="list-group-item">Toplam Birebir Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[3][0].NUMBER}</li>
              <li class="list-group-item">Toplam Ödev Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[4][0].NUMBER}</li>
              <li class="list-group-item">Toplam Ders Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[5][0].NUMBER}</li>

            </ul>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-8">
            <h6 style={{paddingLeft:"16px"}}>Verilen son 5 ödev</h6>
            <Table dataparam={lastHomeworks} columns={lastHomeworksColumns} noTableHead={false} fixedHeader={false}/>
          </div>
          <div className="col-4">
            <p style={{position:"absolute", right:"0", bottom:"0"}}>anilerencelik@gmail.com</p>
          </div>
        </div>
      </div>
        )
}

export default Panel;