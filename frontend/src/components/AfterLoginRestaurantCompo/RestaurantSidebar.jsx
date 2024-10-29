import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import LogoutIcon from '@mui/icons-material/Logout';
import RecyclingIcon from '@mui/icons-material/Recycling';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const RestaurantSidebar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout') // Corrected URL
      .then(res => {
        if (res.data.status) {
          localStorage.removeItem('restautantId');
          navigate('/ResLogin');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sideMenu = [
    { title: 'Dashboard', icon: <SpaceDashboardIcon sx={{ fontSize: 30 }} />, path: '/RestaurantLayout/ResDashBoard' },
    { title: 'Eco Orders', icon: <ShoppingBagIcon sx={{ fontSize: 30 }} />, path: '/RestaurantLayout/ResOrders' },
    { title: 'Trash2Treasure ', icon: <RecyclingIcon  sx={{ fontSize: 30 }} />, path: '/RestaurantLayout/OgMain' },
    { title: 'Upcycle Creation', icon: <CreateIcon sx={{ fontSize: 29 }} />, path: '/RestaurantLayout/ResMenu' },
    { title: 'Nearby waste', icon: <LocationOnIcon sx={{ fontSize: 30 }} />, path: '/RestaurantLayout/NearByWaste' }, // Updated icon
    { title: 'Details', icon: <InfoIcon sx={{ fontSize: 30 }} />, path: '/RestaurantLayout/ResDetails' },
    { title: 'Logout', icon: <LogoutIcon sx={{ fontSize: 30 }} />, onClick: handleLogout },
  ];

  return (
    <div className='mt-[78px] w-60 h-[520px] shadow-xl fixed z-10'>
      <ul className='flex flex-col gap-2 px-2 pt-4 w-full'>
        {
          sideMenu.map((item, index) => (
            item.title === 'Logout' ? (
              <li
                key={index}
                className='flex gap-4 items-center text-center hover:bg-neutral-200 rounded-md p-3 w-full cursor-pointer'
                onClick={item.onClick} // Handling logout
              >
                <span>{item.icon}</span>
                <span className='text-lg font-poppins'>{item.title}</span>
              </li>
            ) : (
              <Link to={item.path} key={index}>
                <li className='flex gap-4 items-center text-center hover:bg-neutral-200 rounded-md p-3 w-full'>
                  <span>{item.icon}</span>
                  <span className='text-lg font-poppins'>{item.title}</span>
                </li>
              </Link>
            )
          ))
        }
      </ul>
    </div>
  );
};

export default RestaurantSidebar;