import './Bands.scss';
import React from 'react';
import { Link } from 'react-router-dom';
//import { getBands, getSongs, getPlays, getSet, getSong } from '../../api';

const Bands = ({ setBand, bands }) => {
    console.log(bands);
    const bandsToDisplay = bands.map(band => {
        return <Link to='/' onClick={() => setBand(band.id, band.name)}>{band.name}</Link>
    })
    return (
        <section className='bandList'>
            {bandsToDisplay}
        </section>

    )
}

export default Bands;