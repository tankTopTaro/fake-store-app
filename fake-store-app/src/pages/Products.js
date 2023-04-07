import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const isAuth = localStorage.getItem('auth');
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: "https://fakestoreapi.com/products"
        }).then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, []);

    const productHandler = (productId) => {
        navigate(`/products/${productId}`)
    }

    if(!isAuth){
        return <Navigate replace to='/login' />;
    } else {
        return (
            <div className='products-container'>
                {loading && (
                    <div>
                        {" "}
                        <h1>Loading...</h1>
                    </div>
                )}
    
                {data.map((product) => (
                    <div key={product.id} className='card' onClick={() => productHandler(product.id)}>
                        <div><img src={product.image} alt="#"/></div>
                        <div className='card-description'>
                            <h6>{product.title}</h6>
                            <h6>{`Price: $ ${product.price}`}</h6>
                            <h6>{`Category: ${product.category}`}</h6>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}

export default Products;