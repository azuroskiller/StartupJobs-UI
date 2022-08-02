import React, { useState, useEffect } from 'react'
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { Navbar, NavDropdown } from 'react-bootstrap'

function Header() {
    const [click, setClick] = useState(false);
    const [button, setButon] = useState(true);
    const user = localStorage.getItem('user');
    const type = localStorage.getItem('type');
    const level = localStorage.getItem('level');

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButon(false)
        } else {
            setButon(true)
        }
    };

    const navigate = useNavigate();
    function Logout() {
        localStorage.clear();
        navigate('/')
        window.location.reload(false);
    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <Navbar className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    STARTUP JOBS{' '}
                    <i class="fa-solid fa-briefcase" />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    {
                        localStorage.getItem('user') ?
                            <>
                                {
                                    type === "Company" ?

                                        <>
                                            <li className='nav-item'>
                                                <NavDropdown title="Jobs" >
                                                    <NavDropdown.Item><Link to='/Jobs' style={{ color: '#000000' }}>List of Startup Jobs</Link></NavDropdown.Item>
                                                    <NavDropdown.Item><Link to='/create-job' style={{ color: '#000000' }}>Post Job</Link></NavDropdown.Item>
                                                    <NavDropdown.Item><Link to='/my-job' style={{ color: '#000000' }}>My Job</Link></NavDropdown.Item>
                                                </NavDropdown>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className='nav-item'>
                                                <Link
                                                    to='/Jobs' className='nav-links' onClick={closeMobileMenu}>
                                                    Jobs
                                                </Link>
                                            </li>
                                        </>
                                }
                                {
                                    level === "0" ?
                                        <>
                                            <li className='nav-item'>
                                                <NavDropdown title={user} >
                                                    <NavDropdown.Item><Link to='/profile' style={{ color: '#000000' }}>My Profile</Link></NavDropdown.Item>
                                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                                </NavDropdown>
                                            </li>
                                        </>

                                        :
                                        <>
                                            <li className='nav-item'>
                                                <NavDropdown title="Users" >
                                                    <NavDropdown.Item><Link to='/users' style={{ color: '#000000' }}>List of External User</Link></NavDropdown.Item>
                                                    <NavDropdown.Item><Link to='/users-internal' style={{ color: '#000000' }}>List of Internal User</Link></NavDropdown.Item>
                                                    <NavDropdown.Item><Link to='/create-users-internal' style={{ color: '#000000' }}>Create Internal User</Link></NavDropdown.Item>
                                                </NavDropdown>
                                            </li>

                                            <li className='nav-item'>
                                                <NavDropdown title={user} >
                                                    <NavDropdown.Item><Link to='/profile' style={{ color: '#000000' }}>My Profile</Link></NavDropdown.Item>
                                                    <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                                                </NavDropdown>
                                            </li>
                                        </>
                                }
                            </>
                            :
                            <>
                                <li className='nav-item'>
                                    {button && <Link to='/Login'><Button buttonStyle='btn--outline'>Login</Button></Link>}
                                </li>
                            </>
                    }

                </ul>
            </Navbar>
        </>
    );
}

export default Header;
