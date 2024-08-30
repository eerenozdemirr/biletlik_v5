import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); 

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'name':
                if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMsg = 'Geçersiz isim formatı. Sadece harf ve boşluk içermelidir.';
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMsg = 'Geçersiz e-posta adresi.';
                }
                break;
            case 'phone':
                if (!/^\d{10}$/.test(value.replace(/\s+/g, ''))) {
                    errorMsg = 'Geçersiz telefon numarası. 10 haneli olmalıdır.';
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    errorMsg = 'Şifre en az 8 karakter, bir harf ve bir rakam içermelidir.';
                }
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: errorMsg
        });
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);

        return password.length >= minLength && hasLetters && hasNumbers;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errors).some(error => error)) {
            alert("Lütfen formu düzeltin.");
            return;
        }

        setIsSubmitting(true);
        setShowOverlay(true); 

        try {
            const response = await fetch('http://biletlik.net/backend/signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            setTimeout(() => {
                if (response.ok && data.message === "Yeni kayıt başarıyla eklendi") {
                    setSubmissionMessage('Kayıt başarılı. Ana ekrana yönlendiriliyorsunuz.');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    setSubmissionMessage(data.message);
                }
                setShowOverlay(false);
            }, 3000); 

        } catch (error) {
            console.error('Kayıt hatası:', error);
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
        <div className="signup-container">
            {showOverlay && (
                <div className="overlay">
                    <div className="loader"></div>
                </div>
            )}
            <div className="signup-header">
                <div className="logo" onClick={handleLogoClick}>biletlik</div>
            </div>
            <div className="signup-form">
                <h2>Hesap Oluştur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Ad Soyad</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={form.name} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">E-posta</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={form.email} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Telefon Numarası</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={form.phone} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className="input-group password-group">
                        <label htmlFor="password">Şifre</label>
                        <div className="password-container">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                id="password" 
                                name="password" 
                                value={form.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                                <i className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit" className="signup-button">
                        {isSubmitting ? (
                            <span className="spinner"></span>
                        ) : (
                            'Hesap Oluştur'
                        )}
                    </button>
                </form>
                {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
                <div className="login-redirect">
                    <a href="/login">Zaten hesabınız var mı? Giriş Yapın</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
