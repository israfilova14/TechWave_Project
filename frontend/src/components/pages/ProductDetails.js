import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from '../../helpers/displayCurrency';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description:  "",
    price: "",
    sellingPrice:  ""
  }) 
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null) 
  const [activeImage, setActiveImage] = useState("")
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  console.log("product id", params);
  const [zoomImage, setZoomImage] = useState(false)
  const fetchProductDetails = async()=>{
    setLoading(true)
     const response = await fetch(SummaryApi.productDetails.url, {
      method : SummaryApi.productDetails.method,
      headers: {
        "content-type" : "application/json" 
      },
      body : JSON.stringify({
        productId : params?.id,
        
      })
     })
     setLoading(false)
     const dataResponse = await response.json()
     setData(dataResponse?.data)
     setActiveImage(dataResponse?.data?.productImage[0])
  }

  useEffect(() =>{
     fetchProductDetails()
  },[])
  console.log("data", data);
  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }
  const handleZoomImage = useCallback((e) =>{
      setZoomImage(true)
      const {left, top, width, height} = e.target.getBoundingClientRect()
      console.log("coordinate", left, top, width, height);
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      setZoomImageCoordinate({
        x,
        y
      })
  },[zoomImageCoordinate])
  const handleLeaveImageZoom  = () => {
    setZoomImage(false)
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
           <div className=' h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
              <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
              {/* product zoom */}
              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] overfolw-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                    <div 
                      className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125' style = {
                        {
                          backgroundImage : `url(${activeImage})`,
                          backgroundRepeat : "no-repeat",
                          backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%` 

                        }
                      }>
                    
                    </div>
              </div>
                )
              }
            
           </div>
           <div className='full'>
             {
              loading ? (
                 <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                        productImageListLoading.map(el => {
                          return(
                          <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>
      
                          </div>
                          )
                      })
                    }
                 </div>
              )
              :
              (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {
                    data?.productImage.map((imageURL, index) => {
                      return(
                      <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imageURL}>
                        <img src={imageURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imageURL)} onClick={() => handleMouseEnterProduct(imageURL)}/>
                      </div>
                      )
                  })
                }
               </div>
              )
             }
           </div>
        </div>
        {/* product details */}
        {
          loading ? (
              <div className='grid gap-1 w-full'>
                <p className='bg-slate-200 animate-pulse w-full inline-block rounded h-4'></p>
                <h2 className='text-xl lg:text-2xl h-4 bg-slate-200 animate-pulse rounded w-full'></h2>
                <p className='capitalize bg-slate-200 w-full animate-pulse h-4 rounded'></p>

                <div className='text-orange-500 flex items-center gap-1 bg-slate-200 h-4 animate-pulse rounded'>
                  
              </div>
              <div className='flex items-center gap-2 text-xl my-1'>
                <p className='text-orange-500 h-4 animate-pulse bg-slate-200 rounded'></p>
                <p className='text-slate-500 line-through h-4 animate-pulse bg-slate-200 rounded'></p>
              </div>
              <div className='flex items-center gap-3 my-2'>
                <button className='rounded py-1 px-3 h-4 w-full bg-slate-200 animate-pulse'></button>
                <button className='rounded py-1 px-3 h-4 w-full bg-slate-200 animate-pulse'></button>
              </div>
              <div>
                <p className='text-slate-500 my-1 h-4 bg-slate-200 animate-pulse'></p>
                <p className='h-4 w-full bg-slate-200 animate-pulse'></p>
              </div>
          </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='hover:text-orange-600 w-full inline-block text-xl'>{data?.brandName}</p>
              <h2 className='text-xl lg:text-2xl'>{data?.productName}</h2>
              <p className='capitalize'>{data?.category}</p>

              <div className='text-orange-500 flex items-center gap-1'>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStarHalf/>
            </div>
            <div className='flex items-center gap-2 text-xl my-1'>
              <p className='text-orange-500'>{displayCurrency(data?.sellingPrice)}</p>
              <p className='text-slate-500 line-through'>{displayCurrency(data?.price)}</p>
            </div>
            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-green-500 rounded py-1 px-3 min-w-[100px] hover:bg-green-500 hover:text-white text-green-500 font-medium'>Buy</button>
              <button className='border-2 border-orange-500 rounded py-1 px-3 min-w-[100px hover:bg-orange-600 hover:text-white text-orange-500 font-medium'>Add To Cart</button>
            </div>
            <div>
              <p className='text-slate-500 my-1'>Description : </p>
              <p>{data?.description}</p>
            </div>
        </div>
          )
        }
      
      </div>
    </div>
  )
}

export default ProductDetails