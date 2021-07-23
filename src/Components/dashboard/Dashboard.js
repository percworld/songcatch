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
      <NavLink exact to='/bands' data-cy='bands' className='bands' activeClassName='activeLink'>Other Bands</NavLink>
    </div>
  )
}

export default Dashboard;




