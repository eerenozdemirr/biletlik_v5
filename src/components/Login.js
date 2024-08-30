import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Göz ikonu durumu

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowOverlay(true);

    try {
      const response = await fetch('http://biletlik.net/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setTimeout(() => {
        if (response.ok && data.success) {
          setSubmissionMessage('Giriş başarılı, ana sayfaya yönlendiriliyorsunuz.');
          localStorage.setItem('userEmail', formData.email); // Kullanıcı e-postasını sakla
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setSubmissionMessage(data.message);
        }
        setShowOverlay(false);
      }, 3000);

    } catch (error) {
      console.error('Giriş hatası:', error);
      setSubmissionMessage('Bir hata oluştu.');
      setShowOverlay(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogoClick = () => {
    navigate('/');
};

  return (
    <div className="login-container">
      {showOverlay && (
        <div className="overlay">
          <div className="loader"></div>
          {submissionMessage && (
            <div className="overlay-message">
              <p>{submissionMessage}</p>
            </div>
          )}
        </div>
      )}
      <div className="login-header">
        <div className="logo" onClick={handleLogoClick}>biletlik</div>
      </div>
      <div className="login-form">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Şifre</label>
            <div className="password-container">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                <i className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
        <div className="create-account">
          <a href="/signup">Hesap Oluştur</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
