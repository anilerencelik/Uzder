import React from 'react'
import { useLocation } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    let location = useLocation().pathname;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-orange">
            <a className="navbar-brand" href="/">UzakDers</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-auto ">
                    <li className={location === "/" ? "nav-item active" : "nav-item"}>
                        <a className="nav-link" href="/">Panel<span className="sr-only">(current)</span></a>
                    </li>
                    <li className={(location === "/edit-lessons" ||
                        location === "/edit-students" ||
                        location === "/edit-teachers" ||
                        location === "/edit-etudes" ||
                        location === "/edit-homeworks" ||
                        location === "/edit-classes") ? "nav-item dropdown active" : "nav-item dropdown"}>
                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ekleme/Çıkarma Menüsü</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={location === "/edit-lessons" ? "dropdown-item active" : "dropdown-item"} href="/edit-lessons">Ders</a>
                            <a className={location === "/edit-students" ? "dropdown-item active" : "dropdown-item"} href="/edit-students">Öğrenci</a>
                            <a className={location === "/edit-teachers" ? "dropdown-item active" : "dropdown-item"} href="/edit-teachers">Öğretmen</a>
                            <a className={location === "/edit-etudes" ? "dropdown-item active" : "dropdown-item"} href="/edit-etudes">Birebir</a>
                            <a className={location === "/edit-homeworks" ? "dropdown-item active" : "dropdown-item"} href="/edit-homeworks">Ödev</a>
                            <a className={location === "/edit-classes" ? "dropdown-item active" : "dropdown-item"} href="/edit-classes">Sınıf</a>
                        </div>
                    </li>
                    <li className={(location === "/report-students" ||
                        location === "/report-teachers" ||
                        location === "/report-homeworks" ||
                        location === "/report-classes") ? "nav-item dropdown active" : "nav-item dropdown"}>
                        <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Rapor Menüsü</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className={location === "/report-students" ? "dropdown-item active" : "dropdown-item"} href="/report-students">Öğrenci</a>
                            <a className={location === "/report-teachers" ? "dropdown-item active" : "dropdown-item"} href="/report-teachers">Öğretmen</a>
                            <a className={location === "/report-homeworks" ? "dropdown-item active" : "dropdown-item"} href="/report-homeworks">Ödev</a>
                            <a className={location === "/report-classes" ? "dropdown-item active" : "dropdown-item"} href="/report-classes">Sınıf</a>
                        </div>
                    </li>
                    <li className={location === "/update-etudes" ? "nav-item active" : "nav-item"}>
                        <a className="nav-link" href="/update-etudes">Birebir Kontrol</a>
                    </li>
                    <li className={location === "/update-homeworks" ? "nav-item active" : "nav-item"}>
                        <a className="nav-link" href="/update-homeworks">Ödev Kontrol</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
