import propTypes from 'prop-types';
import './Bands.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Bands = ({ setBand, bands }) => {
    const lespecial = bands.find(band => band.name === 'lespecial');
    const tempBandList = bands.filter(band => !(band.name === 'lespecial'))
    lespecial && tempBandList.unshift(lespecial);

    tempBandList.splice(76)



    const bandsToDisplay = tempBandList.map(band => {
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

Bands.propTypes = {
    setBand: propTypes.func,
    band: propTypes.object
}