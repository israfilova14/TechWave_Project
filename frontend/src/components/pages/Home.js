import React from 'react'
import CategoryList from '../CategoryList'
import BannerProduct from '../BannerProduct'
import HorizontalCardProduct from '../HorizontalCardProduct'
import VerticalCardProduct from '../VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"earphone"} heading={"Earphones"}/>
      <HorizontalCardProduct category={"headphone"} heading={"Headphones"}/>
      <HorizontalCardProduct category={"phone"} heading={"Phone"}/>
      <VerticalCardProduct category={"mause"} heading={"Mause"}/>
      <VerticalCardProduct category={"noutbook"} heading={"Noutbook"}/>
      <VerticalCardProduct category={"tablet"} heading={"Tablet"}/>
      <VerticalCardProduct category={"smartwatch"} heading={"Smartwatch"}/>
      <VerticalCardProduct category={"television"} heading={"Television"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
    </div>
  )
}

export default Home