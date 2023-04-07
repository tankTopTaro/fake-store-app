import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ token, setToken }) => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const loginHandler = () => {
        setError('');
        setUsername('');
        setPassword('');

        axios({
            url: 'https://fakestoreapi.com/auth/login',
            method: 'POST',
            data: {
                username: userName,
                password: password
            },
        }).then(res => {
            setToken(res.data.token)
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('auth', true)
            navigate('/products')
        }).catch(err => {
            setError(err.response.data)
        });
    }

  return (
    <div className='login'>
        <div className='login-inputs'>
            <input 
                type='text' 
                value={userName} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder='Username' />
            <input 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder='Password' />
            { error && <small>{error}</small> }
            <button onClick={loginHandler} className='btn btn-outline-success'>Login</button>
        </div>
    </div>
  )
}

export default Login