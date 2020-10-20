import React, { useState, useEffect } from 'react'
import reqConfig from '../utils/request'
import axios from 'axios';
import Table from '../components/Table copy'

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

    const getSelections = async () => {
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

        axios(reqConfig("lessons"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setLessons(js.data)
                } else {
                    setLessons([])
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios(reqConfig("panel/etude"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setLastEtudes(js.data)
                } else {
                    setLastEtudes([])
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios(reqConfig("panel/homework"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setLastHomeworks(js.data)
                } else {
                    setLastHomeworks([])
                }
            })
            .catch((error) => {
                console.log(error);
            });

        axios(reqConfig("panel/report"))
            .then((response) => {
                var js = JSON.parse(JSON.stringify(response.data))
                if (js.status) {
                    setStatistics(js.data)
                } else {
                    setStatistics([])
                }
            })
            .catch((error) => {
                console.log(error);

            });
    }


    return (
        <div className="container-fluid" style={{ paddingTop: "8px" }}>
            <div className="row" >
                <div className="col-4">
                    <div style={{ border: "8px double lightgray" }}>
                        <h6 style={{ paddingLeft: "16px" }}>Tüm Sınıflar</h6>
                        <Table dataparam={classes} columns={classColumns} />
                    </div>
                </div>
                <div className="col-4">
                    <div style={{ border: "8px double lightgray" }}>
                        <h6 style={{ paddingLeft: "16px" }}>Tüm Öğretmenler</h6>
                        <Table dataparam={teachers} columns={teachersColumns} />
                    </div>
                </div>
                <div className="col-4">
                    <div style={{ border: "8px double lightgray" }}>
                        <h6 style={{ paddingLeft: "16px" }}>Tüm Dersler</h6>
                        <Table dataparam={lessons} columns={lessonsColumns} />
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-8">
                    <div style={{ border: "8px double lightgray" }}>
                        <h6 style={{ paddingLeft: "16px" }}>Planlanan son 5 birebir</h6>
                        <Table dataparam={lastEtudes} columns={lastEtudesColumns} noTableHead={false} fixedHeader={false} />
                    </div>
                </div>
                <div className="col-4">
                    <h6 style={{ paddingLeft: "16px" }}>İstatistikler</h6>
                    <ul className="list-group">
                        <li className="list-group-item">Toplam Öğrenci Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[0][0].NUMBER}</li>
                        <li className="list-group-item">Toplam Öğretmen Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[1][0].NUMBER}</li>
                        <li className="list-group-item">Toplam Sınıf Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[2][0].NUMBER}</li>
                        <li className="list-group-item">Toplam Birebir Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[3][0].NUMBER}</li>
                        <li className="list-group-item">Toplam Ödev Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[4][0].NUMBER}</li>
                        <li className="list-group-item">Toplam Ders Sayısı: {typeof statistics === 'undefined' ? 0 : statistics[5][0].NUMBER}</li>

                    </ul>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-8">
                    <div style={{ border: "8px double lightgray" }}>
                        <h6 style={{ paddingLeft: "16px" }}>Verilen son 5 ödev</h6>
                        <Table dataparam={lastHomeworks} columns={lastHomeworksColumns} noTableHead={false} fixedHeader={false} />
                    </div>
                </div>
                <div className="col-4">
                    <p style={{ position: "absolute", right: "0", bottom: "0" }}>anilerencelik@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Panel
