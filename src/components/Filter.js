import React from 'react'

const Filter = ({handleProductFilter,value}) => {
  return (
    <div >

  <h1 className="text-lg font-medium inline-block mr-2 ">Filter:</h1>
            <select
              className="border border-black rounded-lg py-2"
              onChange={(e)=>handleProductFilter(e.target.value)}
              value={value}
          
            >
                <option>Select Filter</option>
         
           <option>Price: High to Low</option>
           <option>Price: Low to High</option>
           <option>Sort By: A to Z</option>
           <option>Sort By: Z to A</option>
            </select>


    </div>
  )
}

export default Filter