// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';

function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
        const token = await axios.post('http://localhost:3000/auth/login', formData);
        console.log('API response:', token.data);
        localStorage.setItem("token", token.data.token);
        // Optionally, perform any other actions based on the API response
    } catch (error) {
        console.error('Error calling API:', error);
        // Optionally, handle errors or display error messages to the user
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
  <h1>Log In</h1>
  <form onSubmit={handleSubmit}>
    <div className="flex-container">
      <div className="flex-item">
        <div className="form-group">
          <input type="text" name = "username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name = "password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>
      </div>
    </div>
    <div className="button-container">
      <button type="submit">Log In</button>
    </div>
  </form>
</div>

  

  );
}

export default LogIn;
