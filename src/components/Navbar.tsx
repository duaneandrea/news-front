import { Link, useNavigate } from 'react-router-dom';
import * as React from "react";
import {Button } from 'react-bootstrap';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            {/* Header Section */}
            <header className="mb-5 pb-5">
                <div className="header-area header-area1 d-none d-lg-block" id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="header-elements">
                                    <div className="main-menu-ex main-menu-ex1">
                                        <ul>
                                            <li className="dropdown-menu-parrent">
                                                <Link to="/" className="main1">Home</Link>
                                            </li>
                                            {token && <li><Link to="/preferences">Update Preferences</Link></li>}
                                            {/* Conditionally display Account menu */}
                                            <li className="dropdown-menu-parrent">
                                                <Link to="#" className="main1">My Account <i className="fa-solid fa-angle-down"></i></Link>
                                                <ul>
                                                    {token ? (
                                                        <>
                                                            <li><Link to="/feed">My Feed</Link></li>
                                                            <li><Button className='btn btn-link' style={
                                                                {
                                                                    textDecoration: 'none',
                                                                }} variant="link" onClick={handleLogout}>Logout</Button></li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li><Link to="/login">Login</Link></li>
                                                            <li><Link to="/register">Sign Up</Link></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Header Section */}
            <div className="mobile-header mobile-header-main d-block d-lg-none">
                <div className="container-fluid">
                    <div className="col-12">
                        <div className="mobile-header-elements">
                            <div className="mobile-logo">
                                <Link to="/"><img src="/vite.svg" alt="News Aggregator" /></Link>
                            </div>
                            <div className="mobile-nav-icon">
                                <i className="fa-duotone fa-bars-staggered"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-sidebar d-block d-lg-none">
                <div className="logo-m">
                    <Link to="/"><img src="/vite.svg" alt="News Aggregator" /></Link>
                </div>
                <div className="menu-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="mobile-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {token ? (
                            <>
                                <li><Link to="/feed">My Feed</Link></li>
                                <li><Link to="/preferences">Update Preferences</Link></li>
                                <li><Button className='btn btn-link' style={
                                    {
                                        textDecoration: 'none',
                                    }} variant="link" onClick={handleLogout}>Logout</Button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Create Account</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
