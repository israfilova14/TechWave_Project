import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';

const Header = () => {
  const user = useSelector(state => state.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false)

  useEffect(() => {
    console.log("User state in Header component:", user);
  }, [user]);

   
  const handleLogout = async () => {
    try {
      console.log("Attempting to logout...");
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include"
      });
      const data = await fetchData.json();
  
      console.log("Logout response data:", data); // Log the response data
  
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-20'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <Link to={'/'}>
          <Logo />
        </Link>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='w-full outline-none pl-2' 
            id='inp'
          />
          <div className='text-lg min-w-[50px] h-8 bg-orange-600 flex items-center justify-center rounded-r-full text-white'>
            <GoSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative group flex justify-center'>
            {
              user?._id && (
                <div className='text-2xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className='w-8 h-8 rounded-full' />
                  ) : (
                    <FaRegCircleUser />
                  )}
              </div>
              )
            }
             {
               menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover: bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                  </nav>
               </div>
               )
             }
          </div>
          <div className='text-3xl relative'>
            <span><IoCartOutline /></span>
            <div className='bg-orange-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 right-3 '>
              <p className='text-sm'>0</p>
            </div>
          </div>
          <div>
            {user ? (
              <button 
                onClick={handleLogout} 
                className='px-3 py-1 rounded-full bg-orange-600 hover:bg-orange-700 text-white'
              >
                Logout
              </button>
            ) : (
              <Link to={'/login'}>
                <button className='px-3 py-1 rounded-full bg-orange-600 hover:bg-orange-700 text-white'>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
