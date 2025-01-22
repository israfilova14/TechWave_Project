import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCurrency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCard from '../helpers/addToCard';
import Context from '../context';
 
const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)
    const handleAddToCart = async(e, id) => {
        await addToCard(e, id)
        fetchUserAddToCart()
    }
    const scrollElement = useRef();
    const fetchData = async() => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log("horizontal data", categoryProduct.data);
        setData(categoryProduct?.data)
    }
    useEffect(() => {
        fetchData()
    },[])
    const scrollRight = () => {
        scrollElement.current.scrollLeft +=320
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -=320
    }
    
  return (
    <div className='container mx-auto px-4 my-4 relative'>
        <h2 className='text-lg font-medium py-1'>{heading}</h2>
        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button className='bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block' onClick={scrollLeft}>
                <FaAngleLeft/>
            </button>
            <button className='bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollRight}>
                <FaAngleRight/>
            </button>
        {   
        loading ? (
        loadingList.map((product, index) => {
            return(
                <div className='w-full min-w-[320px] md:min-w-[360px]  max-w-[320px] md:max-w-[360px] h-36 bg-white rounded-sm shadow-md flex' key={index}>
                    <div className='bg-[#f0f0f0] h-full p-2 w-[135px] md:w-[145px] animate-pulse'></div>
                    <div className='p-4 flex flex-col gap-3'>
                        <div className='w-[200px] h-[30px] rounded-full bg-[#f0f0f0] animate-pulse'></div>
                        <div className='flex gap-3'>
                            <div className='w-[90px] h-[30px] rounded-full bg-[#f0f0f0] animate-pulse'></div>
                            <div className='w-[90px] h-[30px] rounded-full bg-[#f0f0f0] animate-pulse'></div>
                        </div>
                        <div className='w-[200px] h-[30px] rounded-full bg-[#f0f0f0] animate-pulse'></div>
                    </div>
               </div>
               )
            })
        
        ):
        (
            data.map((product, index) => {
                return(
                    <Link 
                      to={"/product/" + product?._id} 
                      className='w-full min-w-[320px] md:min-w-[360px]  max-w-[320px] md:max-w-[360px] h-36 bg-white rounded-sm shadow-md flex' key={index}
                    >
                        <div className='bg-[#f0f0f0] h-full p-2 w-[135px] md:w-[145px]'>
                           <img src={product?.productImage[0]} className='object-scale-down h-full w-full hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 flex flex-col items-start justify-center'>
                            <div className='font-medium text-ellipsis grid'> 
                                <h2 className='line-clamp-1'>{product?.productName}</h2>
                                <p className='capitalize text-slate-600'>{product.category}</p>
                            </div>
                            <div className='flex gap-3'>
                                <p className='text-orange-600 font-medium'>{ displayCurrency( product?.sellingPrice)}</p>
                                <p className='text-slate-600 line-through'>{ displayCurrency( product?.price)}</p>
                            </div>
                            <button 
                               className='text-sm bg-orange-500 my-1 text-white px-4 py-1 rounded-full hover:bg-orange-600 hover:py-2' 
                               onClick={(e) => handleAddToCart(e, product?._id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                   </Link>
                   )
                })
        )
        }
        </div>
    </div>
  )
}

export default HorizontalCardProduct