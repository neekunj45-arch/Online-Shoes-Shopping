import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreItems from '../../components/ExploreItems/ExploreItems'
import ProductDisplay from '../../components/productDisplay/productDisplay'
const Home = () => {

  const [category,setCategory] = useState("All");
  const [search,setSearch] = useState("")

  return (
    <div>
      <Header/>
      <ExploreItems category={category} setCategory={setCategory} search={search} setSearch={setSearch} />
      <ProductDisplay category={category} search={search} />
    </div>
  )
}

export default Home
