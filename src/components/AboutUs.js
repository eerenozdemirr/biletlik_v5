import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  const handleLogoClick = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <div className="about-us">
      <header>
      <div className="logo" onClick={handleLogoClick}>biletlik</div>
        <nav>
          <ul>
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="/help">Yardım</a></li>
            <li><a href="/login" className="login-button">Giriş Yap</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="content">
          <div className="text-section">
            <h1>Hakkımızda</h1>
            <p>
              Biletlik, konser deneyiminizi en üst seviyeye çıkarmak için tasarlanmış yenilikçi bir platformdur.
              Misyonumuz, kullanıcılarımıza en iyi hizmeti sunarak konserlerde öne geçmelerini sağlamaktır.
            </p>
            <p>
              Ekibimiz, teknoloji ve eğlence sektöründeki deneyimleri ile biletlik'i sizin için oluşturdu. 
              Bizimle iletişime geçmek ve daha fazla bilgi almak için <a href="/contact">iletişim</a> sayfamızı ziyaret edebilirsiniz.
            </p>
          </div>
          <div className="image-section">
            <img src="/assets/aboutus.png" alt="About Us" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;
