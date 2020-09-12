import React from 'react';
import styles from './Header.module.css';

import home from '../icons/homepage.svg';
import eLesson from '../icons/edit-lesson.svg';
import eClass from '../icons/edit-class.svg';
import eStudent from '../icons/edit-student.svg';
import eTeacher from '../icons/edit-teacher.svg';
import eEtude from '../icons/edit-etude.svg';
import eHomework from '../icons/edit-homework.svg';
import rStudent from '../icons/report-student.svg';
import rTeacher from '../icons/report-teacher.svg';
import rClass from '../icons/report-class.svg';
import rHomeWork from '../icons/report-homework.svg';
import uEtudeD from '../icons/update-etude.svg';
import uEtudeW from '../icons/update-etude-week.svg';
import uHomeworkD from '../icons/update-homework.svg';
import uHomeworkW from '../icons/update-homework-week.svg';
import temp from '../icons/temp.svg';

import { BrowserRouter, Route, Link } from 'react-router-dom';


const Header  = ({title = "Panel"}) => {
    return (
        <div className={styles.outer} >
            <div className={styles.inner}>
                <div className={styles.navColumn}>
                    <a href="/panel">
                    <div className={styles.rowtop}>
                        <img src={home} alt="Homepage"/>
                    </div></a>
                    <div className={styles.rowbetween}>
                        <p>Anasayfa</p>
                    </div>
                </div>
                <div className={styles.navColumn}>
                    <div className={styles.rowtop}>
                        <a href="/edit-lessons">
                        <div className={styles.rowbetween}>
                            <img src={eLesson} alt="Lesson"/>
                            <p>Ders</p>
                        </div>
                        </a>
                        <a href="/edit-students">
                        <div className={styles.rowbetween}>
                            <img src={eStudent} alt="Student"/>
                            <p>Öğrenci</p>
                        </div>
                        </a>
                        <a href="/edit-teachers">
                        <div className={styles.rowbetween}>
                            <img src={eTeacher} alt="Teacher"/>
                            <p>Öğretmen</p>
                        </div>
                        </a>
                        <a href="/edit-etudes">
                        <div className={styles.rowbetween}>
                            <img src={eEtude} alt="Etude"/>
                            <p>Birebir</p>
                        </div></a>
                        <a href="/edit-homeworks"> 
                        <div className={styles.rowbetween}>
                            <img src={eHomework} alt="Homework"/>
                            <p>Ödev</p>
                        </div>
                        </a>
                        <a href="/edit-classes"> 
                        <div className={styles.rowbetween}>
                            <img src={temp} alt="Classroom"/>
                            <p>Sınıf</p>
                        </div>
                        </a>
                    </div>
                </div>
                <div className={styles.navColumn}>
                    <div className={styles.rowtop}>
                    <a href="/report-students"> 
                        <div className={styles.rowbetween}>
                            <img src={rStudent} alt="Student"/>
                            <p>Öğrenci</p>
                        </div>
                        </a>
                        <a href="/report-teachers"> 
                        <div className={styles.rowbetween}>
                            <img src={rTeacher} alt="Teacher"/>
                            <p>Öğretmen</p>
                        </div></a>
                        <a href="/report-classes"> 
                        <div className={styles.rowbetween}>
                            <img src={temp} alt="Classroom"/>
                            <p>Sınıf</p>
                        </div>
                        </a>
                        <a href="/report-homeworks"> 
                        <div className={styles.rowbetween}>
                            <img src={temp} alt="Homework"/>
                            <p>Ödev</p>
                        </div>
                        </a>
                    </div>
                </div>
                <div className={styles.navColumn}>
                    <div className={styles.rowtop}>
                    <a href="/process-etude"> 
                        <div className={styles.rowbetween}>
                            <img src={uEtudeD} alt="EtudeDay"/>
                            <p>Günlük</p>
                        </div></a>
                        <a href="/process-etude-week"> 
                        <div className={styles.rowbetween}>
                            <img src={uEtudeW} alt="EtudeWeek"/>
                            <p>Haftalık</p>
                        </div></a>
                    </div>
                </div>
                <div className={styles.navColumn}>
                    <div className={styles.rowtop}>
                    <a href="/process-homework"> 
                        <div className={styles.rowbetween}>
                            <img src={uHomeworkD} alt="HomeworkDay"/>
                            <p>Günlük</p>
                        </div></a>
                        <a href="/process-homework-week"> 
                        <div className={styles.rowbetween}>
                            <img src={uHomeworkW} alt="HomeworkWeek"/>
                            <p>Haftalık</p>
                        </div></a>
                    </div>
                </div>
            </div>
            <div className={styles.inner}>
                <p className={styles.infotext}>{title}</p>
                <p className={styles.infotext}>Ekleme Çıkarma Menüsü</p>
                <p className={styles.infotext}>Raporlama Menüsü</p>
                <p className={styles.infotext}>Birebir İşlem</p>
                <p className={styles.infotext}>Ödev İşlem</p>
            </div>
        </div>
    );
}

export default Header;