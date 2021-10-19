import propTypes from 'prop-types';
import './Bands.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Back } from '../icons/chevron-circle-left-solid.svg';

const Bands = ({ setBand, bands }) => {
    const lotus = bands.find(band => band.name === 'Lotus');
    const tempBandList = bands.filter(band => !(band.name === 'Lotus'))
    lotus && tempBandList.unshift(lotus);
    tempBandList.splice(76)

    const arraymove = (fromIndex, toIndex) => {
        var element = tempBandList[fromIndex];
        tempBandList.splice(fromIndex, 1);
        tempBandList.splice(toIndex, 0, element);
    }

    arraymove(1, 0) 
    arraymove(15, 0)
    arraymove(4, 10)
    arraymove(3, 9)
    arraymove(3, 9)
    arraymove(3, 2)
    arraymove(16, 4)
    arraymove(12, 15)

    const bandsToDisplay = tempBandList.map(band => {
        return <Link to='/' key={band.id} onClick={() => setBand(band.id, band.name)}>{band.name}</Link>
    })
    return (
        
        <div className='list' data-cy='list'>
            <div className='show-back' onClick={() => window.history.back()}>
                <i><Back className="back backBands"></Back></i>
            </div>
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