import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import '../css/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButon] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButon(false)
        }else{
            setButon(true)
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className="navbar-logo" onClick= {closeMobileMenu} >
                        Startup Jobs
                        <i class="fa-solid fa-briefcase"></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i class={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/Jobs' className='nav-links' onClick={closeMobileMenu}>
                                Jobs
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                                Users
                            </Link>
                        </li>
                    </ul>
                    {button && <Link to='/Login'><Button buttonStyle='btn--outline'>Login</Button></Link>}
                </div>
            </nav>
        </>
    )
}

export default Navbar