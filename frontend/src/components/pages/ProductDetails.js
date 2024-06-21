import React, { useEffect, useState } from 'react'
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

  console.log("product id", params);
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
    //  setLoading(false)
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
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
           <div className=' h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
              <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply'/>
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
              <div className='flex flex-col gap-1'>
                <p className='bg-slate-200 animate-pulse w-full inline-block rounded-full h-4'></p>
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