// CategoryDropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDropdown() {
  const [products, setProducts] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    // Fetch categories from backend API
    const storedToken = localStorage.getItem('token');
    axios.get('http://localhost:3000/users/unSelectedProducts', {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
      setRefetchTrigger(false);
  }, [refetchTrigger]);

  const handleProductSelect = (productId, event) => {
    // event.preventDefault();
    // Submit data to backend
    const storedToken = localStorage.getItem('token');
    console.log({storedToken})
    axios.post(`http://localhost:3000/users/addProduct/${productId}`, {}, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Product added successfully, show notification
      toast.success('Product added successfully', )
    })
      .catch(error => {
        console.error('Error adding products:', error);
        toast.error('Failed to add product');
        
})
setRefetchTrigger(true);
};

  return (
    <div className="product-list">
    {products.map((product, index) => (
      <div key={index} className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <button onClick={() => handleProductSelect(product.id)}>Add Product</button>
        </div>
      </div>
    ))}
    <ToastContainer position='top-right'></ToastContainer>
  </div>

  );
}

export default ProductDropdown;
