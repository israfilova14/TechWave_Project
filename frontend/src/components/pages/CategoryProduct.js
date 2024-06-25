import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import productCategory from '../../helpers/productCategory'
const CategoryProduct = () => {
    const params = useParams()
    const [data, setData] = useState([])
    // {
    //   params.categoryName
    // }
  return (
    <div className='container mx-auto p-4'>
       {/* desktop version */}
       <div className='hidden lg:grid grid-cols-[240px,1fr]'>
          {/* left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-150px)] overflow-y-scroll'>
            {/* sort by */}
              <div className=''>
                <h2 className='text-lg capitalize font-medium border-b border-black pb-1'>Sort Product</h2>
                <form className='flex flex-col gap-2 py-2'>
                  <div className='flex items-center gap-2'>
                    <input type='checkbox' name='sortBy'/>
                    <label>Price - Low to High</label>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type='checkbox' name='sortBy'/>
                    <label>Price - High to Low</label>
                  </div>
                </form>
              </div>
                {/* filter by */}
                <div className=''>
                  <h2 className='text-lg capitalize font-medium border-b border-black pb-1'>Category Product</h2>
                <form className='flex flex-col gap-2 py-2'>
                  {
                    productCategory.map((categoryName, index) => {
                      return(
                        <div className='flex items-center gap-2'>
                          <input type='checkbox' name={"category"} id={categoryName?.value}/>
                          <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                        </div>
                      )
                    })
                  }
                </form>
              </div>
          </div>
          {/* right side */}
          <div>
            display product
          </div>
       </div>
    </div>
  )
}

export default CategoryProduct