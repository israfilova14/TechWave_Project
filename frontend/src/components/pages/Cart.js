import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../../common'
import Context from '../../context'
import displayCurrency from '../../helpers/displayCurrency'
import { MdDeleteOutline } from "react-icons/md";

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
     const increaseQuantity = async(id, quantity) => {
          const response = await fetch(SummaryApi.updateCartProduct.url, {
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body :JSON.stringify(
                {
                    _id : id,
                    quantity : quantity + 1
                }
            )
          }) 
          const responseData = await response.json()
          if(responseData.success){
              fetchData()
          }
     }

     const decreaseQuantity = async(id, quantity) => {
        if(quantity >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body :JSON.stringify(
                    {
                        _id : id,
                        quantity : quantity - 1
                   }
                )
            }) 
            const responseData = await response.json()
            if(responseData.success){
                fetchData()
            }
        }
   }
   const deleteCartProduct = async(id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body :JSON.stringify(
                {
                    _id : id
                }
            )
        }) 
        const responseData = await response.json()
        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
   }
   const totalQuantity = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
   const totalPrice = data.reduce((previous, current) => previous + (current.quantity * current?.productId?.sellingPrice) ,0)
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
                                <div key={product?._id + "Add To Cart Loading"} className='w-full h-32 my-2 bg-white border border-slate-200 rounded flex gap-2'>
                                     <div className='w-28 h-28'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                     </div>
                                     <div className='p-2 relative w-full'>
                                        {/* delete product */}
                                        <div className='absolute right-0  bg-orange-100 rounded-full text-2xl p-1 mr-2 hover:bg-orange-400 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                           <MdDeleteOutline/>
                                        </div>
                                        <p className='text-lg text-ellipsis line-clamp-1'>{product?.productId?.productName}</p>
                                        <p className='text-slate-500'>{product?.productId?.category}</p>
                                        <div className='flex items-center justify-between'>
                                          <p className='text-orange-500'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                          <p className='text-black-500'>{displayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-2 pt-2'>
                                            <button className='border border-orange-500 px-2 rounded hover:bg-orange-500 hover:text-white' onClick={() => decreaseQuantity(product?._id, product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-green-500 px-2 rounded hover:bg-green-500 hover:text-white' onClick={() => increaseQuantity(product?._id, product?.quantity)}>+</button>
                                        </div>
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
                    <div className='h-36 bg-white border border-slate-200'>
                         <h2 className='text-white bg-green-500 px-3 py-1'>Total Products</h2>
                         <div className='flex gap-2 items-center p-1'>
                            <p>Quantity : </p>
                            <p>{totalQuantity}</p>
                         </div>
                         <div className='flex gap-2 items-center p-1'>
                            <p>Total Price : </p>
                            <p>{displayCurrency(totalPrice)}</p>
                         </div>
                    </div>
                    )
                }
             </div>
            
        </div>
    </div>
  )
}

export default Cart