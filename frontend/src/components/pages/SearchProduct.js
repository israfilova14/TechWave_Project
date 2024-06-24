import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import SummaryApi from '../../common';

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    console.log("query", query.search);
    const fetchProduct = async() => {
      setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)
        console.log("dataResponse", dataResponse);
    }
    useEffect(() => {
       fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-3'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      <p>Search Product : {data.length}</p>
      {
        data.length === 0 && !loading && (
           <p className='text-center p-3'>No Data Found...</p>
        )
      }
      {/* {
        data.length !==0  && !loading &&(
          data.map((product, index) => {
            return(

            )
          })
        )
      } */}
      
    </div>
  )
}

export default SearchProduct