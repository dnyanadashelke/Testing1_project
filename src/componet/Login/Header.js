import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showTab, setShowTab] = useState(false);
  const storedStatus = sessionStorage.getItem('username');
 
  const toggleTab = () => {
    setShowTab(!showTab);
  };
 
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };
 
  // Function to get initials from user name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header id="headerContainer" className="Header__header Header__defaultContent blue-background" role="banner">
      <div className="Header__navbar" id="navBar" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="Header__container" id="navBarContainer">
          <div className="Header__logo">
            <a data-id="portal_linback_url" href="/">
              <img
                alt="AutomationEdge"
                data-id="portal_logo"
                src="https://contacts.zoho.in/file?ot=8&amp;t=serviceorg&amp;ID=60001911841"
                aria-label="AutomationEdge home"
              />
            </a>
          </div>
        </div>
        <div className="Header__user-icon" onClick={toggleTab} style={{ cursor: 'pointer' }}>
          <div
            className="user-icon-circle"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 'bold' }}>
              {getInitials(storedStatus)} {/* Replace 'Yash Soni' with the user's name */}
            </span>
          </div>
        </div>
      </div>
      {showTab && (
        <div className="Header__tab" style={{ position: 'absolute', right: 0, marginRight: '10px' }}>
          <br/>
          <button onClick={handleLogout} className="btn btn-secondary btn-block mb-12">
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};
 
export default Header;
