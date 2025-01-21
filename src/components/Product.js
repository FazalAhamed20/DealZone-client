import React, { useEffect, useState } from 'react'
import { ShimmerPostList } from "react-shimmer-effects";
import ProductList from './ProductList'
import { getApi, productSearchCategoriesApi, searchApi } from '../helper/api'
import { useDispatch, useSelector } from 'react-redux';
import {  toggleCategories } from '../redux/slice/toggleSlice';


const Product = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(null)

  const dispatch=useDispatch()
  const isToggle = useSelector(state=>state.toggle.categoriesToggle)

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (search) {
        let response = await searchApi(search);
        setFilteredProducts(response)

      } else {
        setFilteredProducts(products)

      }


    }, 200);
    return () => {
      clearTimeout(timer)
    }
  }, [search, products])

  const productsFetch = async () => {

    const response = await getApi('/products',)

    let result = await response.json()
    console.log(result)
    setProducts(result.products)
    setFilteredProducts(result.products)




  }
  useEffect(() => {
    productsFetch()
  }, [])

  const handleSubmit = async () => {
    if (search) {
      let response = await searchApi(search);
      setFilteredProducts(response)

    } else {
      setFilteredProducts(products)

    }

  }
  const handleProductCategories=async(category)=>{
    let response = await productSearchCategoriesApi(category)
    console.log(response);
    
    setFilteredProducts(response.products)
    

  }
  


if (filteredProducts ==null){
  return (<ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />)
}

  return (
    <div className='flex'>
      <div className=' w-full'>
        <div className='justify-center align-middle flex mt-10 '>
          <input onChange={(e) => setSearch(e.target.value)}
            className='border border-black w-96 rounded-l-lg p-1 ' type='text' placeholder='Search Product' value={search} />
          <button className='border border-black rounded-r-lg w-14' onClick={handleSubmit}>🔍</button>
        </div>
     <div className='mx-8'>
      <button onClick={()=>{dispatch(toggleCategories())}} className='p-2 m-2 bg-gray-200 border border-gray-300 rounded-lg'>Categories ⬇️</button>
      {
        isToggle && (
          <div>
            {
              products.map (product=>(
                <div className='mx-3 bg-gray-50 w-10 p-2 border-b'>
                   <p onClick={()=>handleProductCategories(product.category)} className='cursor-pointer'>{product.category}</p>
                </div>
               

              ))
            }
          </div>
        )
      }
     </div>

    {
      filteredProducts.length>0 ?  <ProductList products={filteredProducts} /> : <p className='align-middle justify-center flex mt-40 font-bold text-4xl'>No Products</p>
    }
       
      </div>
    </div>
  )
}

export default Product