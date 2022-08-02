import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../css/HeroSection.css';
import { Link } from 'react-router-dom'

function HeroSection() {
    const user = localStorage.getItem('user')

    return (
        <div className='hero-container'>
            <video src='/videos/video-1.mp4' autoPlay loop muted />
            <h1>STARTUP JOBS DATABASE</h1>
            {
                localStorage.getItem('user') ?
                    <>
                        <h2>WELCOME {user}</h2>
                    </>
                    :
                    <>
                        <div className='hero-btns'>
                            <Link to='/create-users'>
                                <Button
                                    className='btnsSignUP'
                                    buttonStyle='btn--outline'
                                    buttonSize='btn--large'
                                >
                                    REGISTER
                                </Button>
                            </Link>
                            <Link to='/Login'>
                                <Button
                                    className='btnsLogin'
                                    buttonStyle='btn--primary'
                                    buttonSize='btn--large'
                                >
                                    LOGIN
                                </Button>
                            </Link>
                        </div>
                    </>
            }

        </div>
    );
}

export default HeroSection;