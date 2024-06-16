import React, { useState } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
   data,
   fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
    <div>
          <div className='bg-white p-4 py-3 mt-4 rounded'>
                <div className='w-36'>
                  <div className='w-32 h-32 flex justify-center items-center'>
                     <img src={data?.productImage} width={120} height={120} className='mx-auto object-fill h-full'/>
                  </div>
                  
                  <h1 className='hover:text-orange-400 text-ellipsis line-clamp-2'>{data.productName}</h1>
                  <div>
                    <div>
                      <p className='font-xs'>
                        {
                          displayCurrency(data.sellingPrice)
                        }
                      </p>
                    </div>
                    <div className='w-fit ml-auto p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdOutlineModeEdit/>
                    </div>
                  </div>
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