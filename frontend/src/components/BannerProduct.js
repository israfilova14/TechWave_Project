import React, { useEffect, useState } from 'react'
import banner1 from "../assest/banner images/banner1.jpg"
import banner2 from "../assest/banner images/banner2.jpg"
import banner3 from "../assest/banner images/banner3.jpg"
import banner4 from "../assest/banner images/banner4.png"
// import banner5 from "../assest/banner images/banner.webp"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
const BannerProduct = () => {
  const [currentImage, setCurrenetImage] = useState(0)
 const desktopImages = [
  banner1,
  banner2,
  banner4,
  banner3,  
  // banner5
 ]
 const mobileImages = [
  banner1,
  banner2,
  banner4,
  banner3,  
  // banner5
 ]
 const nextImage = () =>{
  if(desktopImages.length - 1 > currentImage){
    setCurrenetImage(preve => preve + 1 )
  }
 }
 const preveImage = () =>{
  if(currentImage !=0 ){
    setCurrenetImage(preve => preve - 1 )
  }
 }
 useEffect(()=>{
   const interval = setInterval(() => {
     if(desktopImages.length - 1 > currentImage){
         nextImage()
     }else{
         setCurrenetImage(0)
     }
   },5000)
   return () => clearInterval(interval)
 },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded overflow-hidden'>
        <div className=' w-full bg-white relative'>
          <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
            <div className='flex justify-between w-full text-2xl'>
                <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'>
                  <FaAngleLeft/>
                </button>
                <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
                  <FaAngleRight/>
                </button>
            </div>
          </div>
          {/* desktop and tablet version */}
           <div className='hidden md:flex h-full w-full overflow-hidden'>
              {
                desktopImages.map((imageURL, index) => {
                  return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={imageURL} className='h-[600px] w-full object-cover '/> 
                  </div>
                  )
                })
              }
           </div>
           {/* mobile version */}
           <div className='flex h-full w-full overflow-hidden md:hidden'>
              {
                mobileImages.map((imageURL, index) => {
                  return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                    <img src={imageURL} className='h-[400px] w-full object-cover'/> 
                  </div>
                  )
                })
              }
           </div>
        </div>
    </div>
  )
}

export default BannerProduct