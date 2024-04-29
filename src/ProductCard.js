import React from 'react';

function ProductCard({ productId, productName, productDescription }) {
  return (
    <div className="product-card">
      <h3>{productName}</h3>
      <p>{productDescription}</p>
      <p>Product ID: {productId}</p>
    </div>
  );
}

export default ProductCard;
