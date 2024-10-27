import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { SiGreasyfork } from "react-icons/si";
import { FaTrashAlt } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Nav = () => {
  const [loggedIn,setLoggedIn] = useState(true);

  return (
    <div className="h-20 w-full fixed z-[50] bg-white top-0">
      <div className="p-5 flex justify-center shadow-md ">
        <nav className="flex justify-between w-full">
        <div className="flex justify-center items-center ml-12">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-3" /> {/* Logo image */}
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-green-600">Green</span>
              <span className="text-black">Bin</span>
            </h1>
          </div>

          <ul className="hidden md:flex gap-x-7 justify-center items-center font-poppins text-[17px] font-medium tracking-[0.01em]">
           
        
            <Link to="/DeliveryPartnerLoginRegister">
              <li className="hover:cursor-pointer hover:scale-[0.975]">
                Delivery partner
              </li>
            </Link>
             <Link to= "/RestaurantLoginRegister"> 
            <li className="hover:cursor-pointer hover:scale-[0.975]">
              Admin login
            </li>
            </Link>

            <Link to="/UserLoginRegister">
              <li className="flex justify-center items-center gap-x-1 hover:cursor-pointer hover:scale-[0.975]">
                Login/Register <VscAccount size={20} />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
