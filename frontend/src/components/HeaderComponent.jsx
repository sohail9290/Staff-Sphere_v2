import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const logo = "/staff-sphere-logo.svg";

const HeaderComponent = () => {
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // optional if you store user info
        navigate("/login");
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand d-flex align-items-center">
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                        />
                        Staff Sphere
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {isLoggedIn && (
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <NavLink to="/employees" className="nav-link">
                                        Employees
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/departments" className="nav-link">
                                        Departments
                                    </NavLink>
                                </li>
                            </ul>
                        )}

                        <ul className="navbar-nav ms-auto">
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
