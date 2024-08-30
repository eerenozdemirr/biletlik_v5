import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Profil ikonu için react-icons kütüphanesini kullanıyoruz
import './Product.css';
import './ProductOverlay.css'; // Ekstra CSS dosyasını import ediyoruz

const Product = () => {
    const [mainImage, setMainImage] = useState('/assets/product2.png');
    const [color, setColor] = useState('darkpurple'); // Seçilen rengi saklayan state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayMessage, setOverlayMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setIsLoggedIn(true);
        }
    }, []);

    const changeImage = (imageSrc, colorName) => {
        setMainImage(imageSrc);
        setColor(colorName); // Seçilen rengi güncelle
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleOrderClick = () => {
        if (isLoggedIn) {
            // Seçilen ürün özelliklerini yerel depolamaya kaydet
            const productDetails = {
                name: 'Kişiye özel rfid bileklik',
                price: '₺427.99',
                image: mainImage,
                color: color,
            };
            localStorage.setItem('selectedProduct', JSON.stringify(productDetails));
            navigate('/checkout'); // Ödeme ekranına yönlendir
        } else {
            setOverlayMessage('Ödeme yapabilmek için önce giriş yapmalısınız.');
            setShowOverlay(true);
        }
    };

    const handleOverlayClose = () => {
        setShowOverlay(false);
        navigate('/login'); // Giriş sayfasına yönlendir
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div className="product-page">
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <p>{overlayMessage}</p>
                        <button onClick={handleOverlayClose} className="overlay-button">Tamam</button>
                    </div>
                </div>
            )}
            <header>
                <div className="logo" onClick={handleLogoClick}>biletlik</div>
                <nav>
                    <ul>
                        {isLoggedIn ? (
                            <li>
                                <button onClick={handleProfileClick} className="profile-button">
                                    <FaUserCircle size={24} />
                                </button>
                            </li>
                        ) : (
                            <li>
                                <button onClick={handleLoginClick} className="login-button">
                                    Giriş Yap
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
            <main>
                <div className="product-container">
                    <div className="product-image">
                        <img src={mainImage} alt="Ürün Resmi" />
                    </div>
                    <div className="product-details">
                        <h1>biletlik</h1>
                        <p className="product-description">Kişiye özel rfid bileklik</p>
                        <div className="color-options">
                            <p>Renk Seçenekleri:</p>
                            <button onClick={() => changeImage('/assets/product1.png', 'Blue')}></button>
                            <button onClick={() => changeImage('/assets/product2.png', 'darkpurple')}></button>
                            <button onClick={() => changeImage('/assets/product3.png', 'claretred')}></button>
                            <button onClick={() => changeImage('/assets/product4.png', 'surfgreen')}></button>
                        </div>
                        <div className="quantity">
                            <p>Adet:</p>
                            <input type="number" min="1" defaultValue="1" />
                        </div>
                        <div className="price">
                            <p>₺427.99</p>
                        </div>
                        <button className="payment-button" onClick={handleOrderClick}>Sipariş Ver</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Product;
