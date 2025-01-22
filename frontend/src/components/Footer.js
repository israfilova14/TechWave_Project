import React from 'react'
import { BsFacebook } from "react-icons/bs"
import { FaTwitter } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { FaTelegram } from "react-icons/fa"
import { FaInstagram } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='bg-white '>
      <div className='container flex flex-col items-center justify-center gap-3 p-4'>
           <h2 className='text-neutral-700 text-2xl font-semibold'>Tech <span className='text-orange-600'>Wave.</span></h2>
           <p className=' w-[70%] text-center text-neutral-900'>
            At TechWave Electronics, we are driven by a passion for cutting-edge technology and a commitment to delivering 
            high-quality, reliable products that shape the future of electronics. Our project is designed to bring smart 
            solutions to everyday challenges, blending innovation with practicality.
           </p>
           <div className='text-2xl flex items-center gap-5 text-neutral-700'>
               <div className='hover:text-orange-600'>
                  <BsFacebook/>
               </div>
               <div className='hover:text-orange-600'>
                   <FaTwitter/>
               </div>
               <div className='hover:text-orange-600'>
                   <FaTelegram/>
               </div>
               <div className='hover:text-orange-600' >
                   <FaInstagram/>
               </div>
           </div>
      </div>
    </footer>
  )
}

export default Footer