import './Dashboard.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = ({ bandName }) => {
  return (
    <div className='dashWrap'>
      <section className='page-container'>
        {bandName === 'Lotus' && 
          <a href='https://sites.google.com/site/thetravellog/original-songs?authuser=0' target="_blank" rel="noopener noreferrer" className='name dashName'>
            <img className="dashImg" src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />
          </a>}
        {bandName === 'lespecial' && <img className="navImg" src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
        <p className='name dashName'>{bandName}</p>
        
      </section>
      <NavLink exact to='/bands' data-cy='bands' className='bands' activeClassName='activeLink'>Other Bands</NavLink>
    </div>
  )
}

export default Dashboard;




