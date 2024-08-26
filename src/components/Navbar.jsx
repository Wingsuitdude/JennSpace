import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  const checkAdminStatus = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
    } else {
      setIsAdmin(data.is_admin);
    }
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300 transform hover:scale-105">
            Jenn Space
          </Link>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
            {user ? (
              <>
                <button onClick={signOut} className="text-red-400 hover:text-red-300 transition duration-300">Sign Out</button>
                {isAdmin && (
                  <NavLink to="/admin">Admin Dashboard</NavLink>
                )}
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-green-400 hover:text-green-300 transition duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-2 space-y-2 animate-pulse">
            <NavLink to="/" mobile>Home</NavLink>
            <NavLink to="/blogs" mobile>Blogs</NavLink>
            {user ? (
              <>
                <button onClick={signOut} className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 transition duration-300">Sign Out</button>
                {isAdmin && (
                  <NavLink to="/admin" mobile>Admin Dashboard</NavLink>
                )}
              </>
            ) : (
              <NavLink to="/login" mobile>Login</NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, mobile }) => (
  <Link 
    to={to} 
    className={`${mobile ? 'block' : ''} px-4 py-2 text-blue-400 hover:text-blue-300 transition duration-300 transform hover:scale-105`}
  >
    {children}
  </Link>
);

export default Navbar;