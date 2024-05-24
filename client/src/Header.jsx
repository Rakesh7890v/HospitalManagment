import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({successMessage}) => {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const storedactivelink = localStorage.getItem('active');
    if(storedactivelink){
      setActiveLink(storedactivelink);
    }
  },[])

  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem('active', link);
  };

  return (
    <div>
      {successMessage && (<div className="success">
        <p>Successfully Submitted!...</p>
      </div>)}
      <div className="header-container">
        <div className="nav"></div>
        <div className="header">
          <p className={activeLink === '/' ? 'navs' : '' }>
            <Link to='/' className='link' onClick={() => handleLinkClick('/')}>Appointment</Link>
          </p>
          <p className={activeLink === '/doctor' ? 'navs' : '' }>
            <Link to='/doctor' className='link' onClick={() => handleLinkClick('/doctor')}>Doctor</Link>
          </p>
          <p className={activeLink === '/patient' ? 'navs' : '' }>
            <Link to='/patient' className='link' onClick={() => handleLinkClick('/patient')}>Patient</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
