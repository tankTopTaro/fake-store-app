import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {

  const logOutHandler = () => {
      setToken(null);
      localStorage.clear();
  }

  return (
    <>
      <nav className='nav'>
        <Link to='/' className='site-title'>Fake Store</Link>
        <ul>
          <CustomLink to='/products'>Products</CustomLink>
          {token ? <CustomLink to='/' onClick={logOutHandler}>Logout</CustomLink> : <CustomLink to='/login'>Login</CustomLink>}
        </ul>
      </nav>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  );
}

export default Navbar