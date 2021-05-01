import React from 'react';
import { Link } from 'react-router-dom'
//import {  } from '../../assets/celtic logo thick Vector.ai'
const Header = () => {
    return (
        <header>
            <Link to='/'>
                {/* <img src={'../../assets/celtic logo thick Vector.ai'} /> */}
                <img src={'../../assets/lotuslogo-removebg-preview.png'} />
                <h3>SongSift</h3>
            </Link>


        </header>)
}

export default Header;