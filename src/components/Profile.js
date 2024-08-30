import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {

  const handleLogoClick = () => {
    navigate('/');
  };

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('profile-page'); // Profil sayfası için sınıf ekliyoruz
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchUserData(userEmail);
    }
    return () => {
      document.body.classList.remove('profile-page'); // Bileşen kaldırıldığında sınıfı kaldırıyoruz
    };
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await fetch(`http://biletlik.net/backend/profile.php?email=${email}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Kullanıcı verisi çekilirken hata oluştu:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="profile-container">
      <header>
        <div className="logo" onClick={handleLogoClick}>biletlik</div>
        <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
      </header>
      <main>
        <div className="avatar-container">
          <img src="/path/to/default-avatar.png" alt="Avatar" className="avatar" />
        </div>
        <div className="profile-details">
          <h1>Kişisel Bilgilerim</h1>
          {userData ? (
            <>
              <p><strong>İsim:</strong> {userData.name}</p>
              <p><strong>E-posta:</strong> {userData.email}</p>
              <p><strong>Telefon:</strong> {userData.phone}</p>
            </>
          ) : (
            <p>Yükleniyor...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
