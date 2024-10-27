import React, { useState } from 'react'
import { SiGreasyfork } from 'react-icons/si';
import logo from "../../assets/logo.png";
const DelNav= () => {
    const [status,setStatus]= useState("Open"); 
    const handleChange = (e)=> {
         setStatus(e.target.value);   
    }
    return (
        <div className="h-[78px] w-full fixed z-[50] top-0 shadow-md bg-white">
            <nav className=" p-5 flex gap-x-[900px] ">
            <div className="flex justify-center items-center ml-12">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-3" /> {/* Logo image */}
            <h1 className="font-poppins md:text-3xl font-extrabold tracking-wide flex">
              <span className="text-green-600">Green</span>
              <span className="text-black">Bin</span>
            </h1>
          </div>
                {/* <div className=' font-poppins'>
                    <select className={` shadow-md border-none rounded-md h-8 w-28 font-medium ${status=="Open"?"text-green-600 outline-none":"text-red-600 outline-none"} `} value={status} onChange ={handleChange}>
                    <option className='text-black' value="Open" >Open</option>
                    <option className='text-black' value="Closed" >Closed</option>
                    </select>
                </div> */}
            </nav>
        </div>
    );
}

export default DelNav