import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link, useLocation } from 'react-router-dom'

const CategoryList = () => {
  const [categoryProduct,setCategoryProduct] = useState([])
  const [loading,setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async() =>{
      setLoading(true)
      const response = await fetch(SummaryApi.categoryProduct.url)
      const dataResponse = await response.json()
      setLoading(false)
      setCategoryProduct(dataResponse.data)
  }

  useEffect(()=>{
      fetchCategoryProduct()
  },[])
  
  return (
    <div className='container mx-auto p-3'>
       <div className='flex items-center gap-3 justify-between overflow-y-scroll scrollbar-none'>
            {
                  loading ? (
                        categoryLoading.map((element, index) => {
                          return (
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white animate-ping' key={"categoryLoading" + index}></div>
                          ) 
                        })
                  ) 
                  :
                  (
                    categoryProduct.map((product, index) => {
                        return(
                            <Link to={"/product-category?category=" + product?.category} className='p-3 cursor-pointer' key={product?.category + index}>
                                <div className=' w-16 h-16 md:w-20 md:h-20 p-2 rounded-full overflow-hidden bg-white flex items-center justify-center flex-wrap'>
                                    <img src={product?.productImage[0]} alt={product.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                  )
                 
                }
       </div>
    </div>
  )
}

export default CategoryList