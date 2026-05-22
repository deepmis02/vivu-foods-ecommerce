import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const url = isLogin 
      ? 'https://vivu-foods-backend.onrender.com/api/auth/login' 
      : 'https://vivu-foods-backend.onrender.com/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kuch galat ho gaya');
      }

      if (isLogin) {
        login(data.user, data.token); // Context API update karega
        navigate('/'); // Home page par bhej dega
      } else {
        alert('Account successfully ban gaya! Ab aap login kar sakte hain.');
        setIsLogin(true); // Wapas login screen par le aayega
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-md shadow-md border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        {isLogin ? 'Login to VIVU' : 'Create Account'}
      </h2>
      
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-semibold">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input 
            type="text" name="name" placeholder="Full Name" required 
            value={formData.name} onChange={handleChange}
            className="w-full p-3 border rounded outline-none focus:border-blue-500" 
          />
        )}
        <input 
          type="email" name="email" placeholder="Email Address" required 
          value={formData.email} onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-blue-500" 
        />
        <input 
          type="password" name="password" placeholder="Password" required 
          value={formData.password} onChange={handleChange}
          className="w-full p-3 border rounded outline-none focus:border-blue-500" 
        />
        
        <button type="submit" className="w-full bg-[#fb641b] text-white font-bold py-3 rounded shadow-md hover:bg-[#e05615] transition-colors mt-2">
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </button>
      </form>

      <div className="text-center mt-6 text-gray-500 text-sm">
        {isLogin ? "Naye user hain? " : "Pehle se account hai? "}
        <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-[#2874f0] font-bold hover:underline">
          {isLogin ? 'Yahan Signup karein' : 'Yahan Login karein'}
        </button>
      </div>
    </div>
  );
};

export default Login;