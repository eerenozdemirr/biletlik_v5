import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikonu için react-icons kütüphanesini kullanıyoruz

function Homepage() {
  const handleLogoClick = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="homepage">
      <header>
        <div className="logo" onClick={handleLogoClick}>biletlik</div>
        <nav>
          <ul>
            <li><a href="/aboutus">Hakkımızda</a></li>
            <li><a href="/help">Yardım</a></li>
            {isLoggedIn ? (
              <li><a href="/profile" className="profile-icon"><FaUserCircle size={24} /></a></li>
            ) : (
              <li><a href="/login" className="login-button">Giriş Yap</a></li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <div className="content">
          <h1>biletlik</h1>
          <p>konserlerde seni öne geçirecek biletlik</p>
        </div>
        <a href="/product" className="buy-button">Satın Al</a>
      </main>
    </div>
  );
}

export default Homepage;
