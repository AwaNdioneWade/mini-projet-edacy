import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Erreur lors de la connexion');
      }

      localStorage.setItem('token', data.token);
      toast.success('Connexion réussie !');
      setFormData({ email: '', password: '' });
      setTimeout(() => {
        window.location.href = "/produits";
      }, 1200);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Styles
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  };

  const formContainer = {
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1.2rem',
  };

  const labelStyle = {
    fontWeight: 500,
    marginBottom: '0.4rem',
    color: '#333',
  };

  const inputStyle = {
    padding: '0.7rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '1rem',
    background: '#f9fafb',
    transition: 'border 0.2s',
    marginBottom: '0.2rem',
  };

  const inputFocusStyle = {
    border: '1.5px solid #7c3aed',
    background: '#fff',
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #7c3aed 0%, #6366f1 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem',
    fontWeight: 600,
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    boxShadow: '0 2px 8px rgba(124,58,237,0.08)',
    transition: 'background 0.2s, transform 0.1s',
  };

  const buttonHoverStyle = {
    background: 'linear-gradient(90deg, #6366f1 0%, #7c3aed 100%)',
    transform: 'translateY(-2px) scale(1.03)',
  };

  const [inputFocus, setInputFocus] = useState({});
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <div style={pageStyle}>
      <div style={formContainer}>
        <h2 style={{ textAlign: 'center', color: '#7c3aed', marginBottom: '1.2rem', letterSpacing: '1px' }}>Connexion</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setInputFocus(f => ({ ...f, email: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, email: false }))}
              style={inputFocus.email ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
              required
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={labelStyle}>Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setInputFocus(f => ({ ...f, password: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, password: false }))}
              style={inputFocus.password ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={buttonHover ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Se connecter
          </button>
          <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
            <span style={{ color: '#555', fontSize: '0.97rem' }}>
              Pas de compte ?{' '}
              <a href="/inscription" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 500 }}>
                Inscrivez-vous
              </a>
            </span>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  )
}

export default Connexion
