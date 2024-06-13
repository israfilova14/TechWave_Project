import React, { useState } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({
   data,
   fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
    <div>
          <div className='bg-white p-4 py-3 mt-4 rounded'>
                <img src={data?.productImage} width={120} height={120}/>
                <h1>{data.productName}</h1>
                <div className='w-fit ml-auto p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                    <MdOutlineModeEdit/>
                </div>
                {
                    editProduct && (
                        <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata ={fetchdata}/>
                    )
                }
          </div>
    </div>
  )
}

export default AdminProductCard