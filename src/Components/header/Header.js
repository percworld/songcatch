import React from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
//import {  } from '../../assets/celtic logo thick Vector.ai'

const Header = () => {
    return (
        <header>
            <Link to='/'>
                {/* <img src={'../../assets/celtic logo thick Vector.ai'} /> */}
                {/* <img src={`${process.env.PUBLIC_URL}../../public/assets/lotuslogo-removebg-preview.png`} alt="lotus logo" /> */}

                <h3>Setlift</h3>
            </Link>


        </header>)
}

export default Header;