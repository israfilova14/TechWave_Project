import React, { useEffect, useState } from 'react'
import UploadProduct from '../UploadProduct'
import SummaryApi from '../../common'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])
  const fetchAllProduct = async() => {
     const response = await fetch(SummaryApi.allProduct.url)
     const dataResponse = await response.json()
     console.log("product data", dataResponse);
     setAllProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  },[])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-medium text-lg'>All Products</h2>
        <button className='border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>
      {/* all product */}
      <div>
        {
          allProduct.map((product, index) => {
            return(
              <div>
                <img src={product.productImage} width={100} height={100}/>
              </div>
            )
          })
        }
      </div>
      {/* upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts