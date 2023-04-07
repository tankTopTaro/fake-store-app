import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const productId = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios({
      url: `https://fakestoreapi.com/products/${productId.pid}`,
      method: "GET"
    }).then(res => {
      setProduct(res.data);
      console.log(res.data)
    }).catch(err => console.log(err))
    .finally(() => setLoading(false))
  }, [productId.pid]);

  return (
    <div className='container'>
      {loading && (
          <div>
              {" "}
              <h1>Loading...</h1>
          </div>
      )}
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <h2>$ {product.price}</h2>
      <small>{product.category}</small>
      <p>{product.description}</p>
      
    </div>
  )
}

export default ProductDetail