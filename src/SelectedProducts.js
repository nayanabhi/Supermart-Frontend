// CategoryDropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SelectedProducts() {
  const [products, setProducts] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    axios.get('http://localhost:3000/users/selectedProducts', {
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
    const storedToken = localStorage.getItem('token');
    console.log({storedToken})
    axios.post(`http://localhost:3000/users/removeProduct/${productId}`, {}, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // Product added successfully, show notification
      toast.success('Product removed successfully', )
    })
      .catch(error => {
        console.error('Error adding products:', error);
        toast.error('Failed to remove product');
        
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
          <button onClick={() => handleProductSelect(product.id)}>Remove Product</button>
        </div>
      </div>
    ))}
    <ToastContainer position='top-right'></ToastContainer>
  </div>

  );
}

export default SelectedProducts;
