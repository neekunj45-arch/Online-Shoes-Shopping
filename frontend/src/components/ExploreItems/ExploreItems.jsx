import React from 'react'
import './ExploreItems.css'
import { item_list } from '../../assets/assets'
const ExploreItems = ({category,setCategory,search,setSearch}) => {

  return (
    <div className='explore-item' id='explore-item'>
        <h1>Explore Sneakers</h1>
        
        <p className='explore-item-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit omnis quibusdam modi iste rerum minima sunt illum maxime, ex, fugiat doloremque eligendi quidem provident ducimus. Eveniet, sequi? Dolor, illo iusto.</p>
        <div className="explore-item-list">
            {item_list.map((item,index) => {
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.item_name?"All":item.item_name)} key={index} className='explore-item-list-items'>
                        <img className={category===item.item_name?"active":""} src={item.item_image} alt="" />
                        <p>{item.item_name}</p>
                    </div>   
                )
            })}
        </div>
        <hr />
        {/* search  */}
        <input type="text" className='search-input' placeholder='search products' value={search} onChange={(e)=> setSearch(e.target.value) } />
    </div>
  )
}

export default ExploreItems
