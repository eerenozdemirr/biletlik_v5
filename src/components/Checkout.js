import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const handleLogoClick = () => {
    navigate('/');
  };

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'creditCard',
  });

  const [productDetails, setProductDetails] = useState({
    image: '',
    name: '',
    price: '',
    color: '',
  });

  const [overlay, setOverlay] = useState({ show: false, message: '' });

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (savedProduct) {
      setProductDetails(savedProduct);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem('userEmail');
    const productDetails = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!userEmail || !productDetails || !productDetails.color) {
      setOverlay({ show: true, message: 'Lütfen önce giriş yapın ve bir ürün seçin.' });
      return;
    }

    try {
      const response = await fetch('http://biletlik.net/backend/checkout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          color: productDetails.color, // Renk bilgisi localStorage'dan alınıyor
          formData: formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOverlay({ show: true, message: 'Siparişiniz alınmıştır!' });
      } else {
        setOverlay({ show: true, message: 'Seçilen renk stokta yoktur.' });
      }

      setTimeout(() => setOverlay({ show: false, message: '' }), 5000); // 5 saniye sonra overlay'i gizle
    } catch (error) {
      console.error('Hata:', error);
      setOverlay({ show: true, message: 'Siparişiniz işlenirken bir hata oluştu.' });
      setTimeout(() => setOverlay({ show: false, message: '' }), 5000); // 5 saniye sonra overlay'i gizle
    }
  };

  return (
    <div className="checkout-page">
      <header>
        <div className="logo" onClick={handleLogoClick}>biletlik</div>
      </header>
      <main>
        <div className="product-summary">
          <img src={productDetails.image} alt={productDetails.name} />
          <div className="product-info">
            <h2>{productDetails.name}</h2>
            <p>Fiyat: {productDetails.price}</p>
            <p>Renk: {productDetails.color}</p>
          </div>
        </div>
        <h1>Teslimat Bilgileriniz</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Adınız:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Adres:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Şehir:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Posta Kodu:
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ödeme Yöntemi:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="creditCard">Kredi Kartı</option>
              <option value="paypal">PayPal</option>
            </select>
          </label>
          <button type="submit" className="submit-button">Siparişi Tamamla</button>
        </form>
        {overlay.show && (
          <div className="overlay">
            <div className="overlay-content">
              <p>{overlay.message}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
