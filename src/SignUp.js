// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your sign-up logic here
    try {
        // Make API call here
        const response = await axios.post('http://localhost:3000/users/createUser', formData);
        const token = await axios.post('http://localhost:3000/auth/signin', {username: response?.data?.username, password:response?.data?.password});
        console.log('API response:', token.data);
        localStorage.setItem("token", token.data.token);
        navigate('/products/all')
        // Optionally, perform any other actions based on the API response
    } catch (error) {
        console.error('Error calling API:', error);
        // Optionally, handle errors or display error messages to the user
    }
  };

  return (
    <div className="container">
  <h1>Sign Up</h1>
  <form onSubmit={handleSubmit}>
    <div className="flex-container">
      <div className="flex-item">
        <div className="form-group">
          <input type="text" name = "username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="email" name = "email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name = "password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name = "phone" placeholder="Phone" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>
      <div className="flex-item">
        <div className="form-group">
          <input type="text" name = "city" placeholder="City" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name = "state" placeholder="State" value={formData.state} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name = "country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name = "zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleChange} required />
        </div>
      </div>
    </div>
    <div className="form-group">
      <input type="text" name = "address" placeholder="Address" value={formData.address} onChange={handleChange} required />
    </div>
    <div className="button-container">
      <button type="submit">Sign Up</button>
    </div>
  </form>
</div>

  

  );
}

export default SignUp;
