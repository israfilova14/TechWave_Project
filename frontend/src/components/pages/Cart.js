import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common'
import Context from '../../context'

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async() => {
           setLoading(true)
          const response = await fetch(SummaryApi.addToCartProductWiew.url, {
             method : SummaryApi.addToCartProductWiew.method,
             credentials : "include",
             headers : {
                "content-type" : "application/json"
             },
          })
          setLoading(false)
          const responseData = await response.json()
          if(responseData.success){
            setData(responseData.data)
          }
    }
    useEffect(()=>{
        fetchData()
     },[])
     console.log("cart data", data);
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white hover:text-orange-400 py-2'>There are no products in your cart</p>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-center'>
            {/* view product */}
            <div className='w-full max-w-3xl'>
                {
                    loading ? (
                        loadingCart.map(element => {
                            return (
                                <div key={element + "Add To Cart Loading "} className='w-full h-32 my-2 bg-white animate-pulse border border-slate-200 rounded mx-auto'>
                                     
                                </div>
                            )
                        })
                    ):(
                        data.map((product, index) => {
                            return(
                                <div key={product?._id + "Add To Cart Loading"} className='w-full h-32 my-2 bg-white border border-slate-200 rounded mx-auto'>
                                     <div className='w-28 h-28'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                     </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            {/* Total product */}
             <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                    <div className='h-36 bg-white border border-slate-200 animate-pulse'>
                        Total
                    </div>
                    ):(
                    <div className='h-36 bg-white border border-slate-200 animate-pulse'>
                        Total
                    </div>
                    )
                }
             </div>
            
        </div>
    </div>
  )
}

export default Cart