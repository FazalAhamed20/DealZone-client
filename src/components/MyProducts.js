import React, { useEffect, useState } from 'react'
import { ShimmerPostList } from "react-shimmer-effects";
import { getApi, myProductSearchApi } from '../helper/api'
import AddProduct from '../utils/modal/AddProduct';
import MyProductList from './MyProductList';

const MyProducts = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [isToggle,setIsToggle]=useState(false)
  

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (search) {
        let response = await myProductSearchApi(search);
        setFilteredProducts(response)

      } else {
        setFilteredProducts(products)

      }


    }, 200);
    return () => {
      clearInterval(timer)
    }
  }, [search, products])

  const productsFetch = async () => {

    const response = await getApi('/products/my_products',)

    let result = await response.json()
    setProducts(result.products)
    setFilteredProducts(result.products)




  }
  useEffect(() => {
    productsFetch()
  }, [isToggle])

  const handleSubmit = async () => {
    if (search) {
      let response = await myProductSearchApi(search);
      setFilteredProducts(response)

    } else {
      setFilteredProducts(products)

    }


  }

  if (filteredProducts == null) {
    return (<ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />)
  }

  return (
    
      <>
        {isToggle ? <AddProduct isToggle={isToggle} setIsToggle={setIsToggle} /> : 
        <div className='flex bg-gray-50'>

        <div className=' w-full'>
          <div className='justify-center align-middle flex mt-10 '>
            <input onChange={(e) => setSearch(e.target.value)}
              className='border border-black w-96 rounded-l-lg p-1 ' type='text' placeholder='Search Product' value={search} />
            <button className='border border-black rounded-r-lg w-14' onClick={handleSubmit}>🔍</button>

          </div>
          <button onClick={()=>setIsToggle(true)} className='bg-blue-800 text-white rounded-lg p-2 ml-10 hover:bg-blue-700'>Add Products</button>
          {
            filteredProducts.length > 0 ? <MyProductList products={filteredProducts} /> : <p className='align-middle justify-center flex mt-40 font-bold text-4xl'>No Products</p>
          }
        </div>
      </div>}
      </>
      

  

  )
}

export default MyProducts