import React from 'react'
import CategoryList from '../CategoryList'
import BannerProduct from '../BannerProduct'
import HorizontalCardProduct from '../HorizontalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"earphone"} heading={"Top's Earphones"}/>
    </div>
  )
}

export default Home