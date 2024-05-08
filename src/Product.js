// // SignUp.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import PermanentDrawerLeft from './Drawer';


// function Product() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     // Add your sign-up logic here
//     try {
//         // Make API call here
//         const storedToken = localStorage.getItem('token');
//         const response = await axios.post('http://localhost:3000/products/createProduct', formData, {
//             headers: {
//               'Authorization': `Bearer ${storedToken}`,
//               'Content-Type': 'application/json'
//             }
//           });
//         // Optionally, perform any other actions based on the API response
//         console.log({23434: response?.data})
//     } catch (error) {
//         console.error('Error calling API:', error);
//         // Optionally, handle errors or display error messages to the user
//     }
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <div>

//     <PermanentDrawerLeft/>
//     <form onSubmit={handleSubmit}>
//     <div className="flex-container">
//       <div className="flex-item">
//         <div className="form-group">
//           <input type="text" name = "name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <input type="text" name = "description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
//         </div>
//     <div className="button-container">
//       <button type="submit">Add Product</button>
//     </div>
//     </div>
//     </div>
//   </form>
//   </div>
// )}

// export default Product;


import React, { useState } from 'react';
import axios from 'axios';
import PermanentDrawerLeft from './Drawer';

function Product() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageLink: '',
    weight: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedToken = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/products/createProduct', formData, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log({ 23434: response?.data });
    } catch (error) {
      console.error('Error calling API:', error);
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{ display: 'flex' }}>
      <PermanentDrawerLeft showSearchBar = {false}/>
      <form onSubmit={handleSubmit} style={{ marginLeft: '20px', marginRight: '40px', marginTop: '170px', flexGrow: 1 }}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="imageLink" placeholder="Image Link" value={formData.imageLink} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} required />
        </div>
        <div className="button-container">
          <button type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default Product;
