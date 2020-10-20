import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const Header = ({logOut}) => {

    const [selector, setSelector] = useState(0);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-orange" style={{ backgroundColor: "#dfdfdf", marginBottom: "15px" }}>
            <NavLink onClick={() => setSelector(0)} className="navbar-brand" to="/">UzakDers</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-auto ">
                    <li className="nav-item" >
                        <NavLink onClick={() => setSelector(0)} className="nav-link" to="/" exact activeClassName="active">Panel</NavLink>
                    </li>
                    <li className={selector === 1 ? "nav-item dropdown active" : "nav-item dropdown"}>
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ekleme/Çıkarma Menüsü</Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-lessons" exact activeClassName="active" >Ders</NavLink>
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-students" exact activeClassName="active" >Öğrenci</NavLink>
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-teachers" exact activeClassName="active" >Öğretmen</NavLink>
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-etudes" exact activeClassName="active" >Birebir</NavLink>
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-homeworks" exact activeClassName="active" >Ödev</NavLink>
                            <NavLink onClick={() => setSelector(1)} className="dropdown-item" to="/edit-classes" exact activeClassName="active" >Sınıf</NavLink>
                        </div>
                    </li>
                    <li className={selector === 2 ? "nav-item dropdown active" : "nav-item dropdown"}>
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Rapor Menüsü</Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <NavLink onClick={() => setSelector(2)} className="dropdown-item" exact activeClassName="active" to="/report-students" >Öğrenci</NavLink>
                            <NavLink onClick={() => setSelector(2)} className="dropdown-item" exact activeClassName="active" to="/report-teachers">Öğretmen</NavLink>
                            <NavLink onClick={() => setSelector(2)} className="dropdown-item" exact activeClassName="active" to="/report-homeworks">Ödev</NavLink>
                            <NavLink onClick={() => setSelector(2)} className="dropdown-item" exact activeClassName="active" to="/report-classes">Sınıf</NavLink>
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink onClick={() => setSelector(0)} className="nav-link" to="/update-etudes" exact activeClassName="active">Birebir Kontrol</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink onClick={() => setSelector(0)} to="/update-homeworks" className="nav-link" exact activeClassName="active">Ödev Kontrol</NavLink>
                    </li>
                </ul>
            </div>
            <button type="button" className="btn btn-danger" onClick={() => { logOut() }}>
                Çıkış Yap
            </button>
        </nav>
    )

}

export default Header
