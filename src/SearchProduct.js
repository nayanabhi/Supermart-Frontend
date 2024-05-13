import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MultiActionAreaCard from './ActionAreaCard.js';
import { useNavigate } from 'react-router-dom';
import PermanentDrawerLeft from './Drawer'; 

function ProductDropdown() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch categories from backend API
    const storedToken = localStorage.getItem('token');
    axios.get(`http://localhost:3000/users/unSelectedProducts?searchText=${searchText}`, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log({43435: error, error})
        if(error.response.data.message === 'TokenExpiredError') {
          localStorage.removeItem('token');
          navigate('/signin')
          return;
        }
        console.error('Error fetching categories:', error);
      });
      setRefetchTrigger(false);
  }, [refetchTrigger, searchText]);

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
        if(error.response.data.message === 'TokenExpiredError') {
          localStorage.removeItem('token');
          navigate('/signin')
          return;
        }
        console.error('Error adding products:', error);
        toast.error('Failed to add product');
        
})
setRefetchTrigger(true);
};

  return (
    <div style={{ display: 'flex' }}> {/* Adjust layout to display PermanentDrawerLeft and product list */}
      <PermanentDrawerLeft setSearchText = {setSearchText} showSearchBar={true} /> {/* Render PermanentDrawerLeft component */}
      <div className="product-list-container" style={{ marginRight: '35px', marginTop: '130px', flexGrow: 1 }}> {/* Adjust marginLeft and flexGrow */}
        {products.map((product, index) => (
          <MultiActionAreaCard productId={product.id} productName={product.name} productDescription={product.description} type="Add" handleProductSelect={handleProductSelect} imageLink = {product.imageLink} weight = {product.weight}/>
        ))}
        <ToastContainer position='top-right'></ToastContainer>
      </div>
    </div>
  );
}

export default ProductDropdown;
