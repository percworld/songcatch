import './Dashboard.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = ({ bandName }) => {
  return (
    <div className='dashWrap'>
      <section className='page-container'>
        {bandName === 'Lotus' && 
          <img className="navImg" src={'/assets/lotuslogo-removebg-preview.png'} alt="lotus logo" />}
        {bandName === 'lespecial' && <img className="navImg" src={'/assets/PngItem_2292851.png'} alt="lespecial logo" />}
        <p className='name dashName'>{bandName}</p>
        
      </section>
      <div className='dash-container'>
        <NavLink exact to='/nav' data-cy='songs' activeClassName='activeLink'>Songs</NavLink>
        <NavLink exact to='/tours' data-cy='tours' activeClassName='activeLink'>Tours</NavLink>
        <NavLink exact to='/shows' data-cy='shows' activeClassName='activeLink'>Shows</NavLink>
      </div>
    </div>
  )
}

export default Dashboard;




