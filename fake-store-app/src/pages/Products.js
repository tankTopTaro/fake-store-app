import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'
import { Navigate } from 'react-router-dom';

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const isAuth = localStorage.getItem('auth');

    useEffect(() => {
        setLoading(true);
        axios({
            method: "GET",
            url: "https://fakestoreapi.com/products"
        }).then(res => {
            console.log(res.data)
            setData(res.data)
        }).catch(e => console.log(e))
        .finally(() => setLoading(false))
    }, []);

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
                    <div key={product.id} className='card'>
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

export default Products