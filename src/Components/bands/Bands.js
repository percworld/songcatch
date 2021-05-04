import propTypes from 'prop-types';
import './Bands.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Bands = ({ setBand, bands }) => {
    console.log(bands);
    const bandsToDisplay = bands.map(band => {
        return <Link to='/' key={band.id} onClick={() => setBand(band.id, band.name)}>{band.name}</Link>
    })
    return (
        <div className='list' data-cy='list'>
            <section className='bandList'>
                {bandsToDisplay}
            </section>
        </div>

    )
}

export default Bands;