import React, { useEffect, useState } from 'react'
import { ShimmerPostList } from "react-shimmer-effects";
import { deleteApi, editApi, getApi, myProductSearchApi, postApi } from '../helper/api'
import AddProduct from '../utils/modal/AddProduct';
import MyProductList from './MyProductList';
import { toast } from 'react-toastify';
import { validateProduct } from '../utils/validateProducts';
import { uploadImageToCloudinary } from '../helper/cloudinary';
import { useSearchParams } from 'react-router-dom';

const MyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([])
  const [requests,setRequests] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [isToggle, setIsToggle] = useState(false)
  const [error, setError] = useState('')
  const [isLoading,setIsLoading]=useState(false)
    const [isRequestProductToggle , setIsRequestProductToggle] = useState(false)
    const search = searchParams.get('search') || '';
  useEffect(() => {
    let timer = setTimeout(async () => {
      if (search) {
        let response = await myProductSearchApi(search);
        setFilteredProducts(response)
        setSearchParams({ search: search });
      } else {
        setSearchParams({});
        setFilteredProducts(products)
      }
    }, 200);
    return () => {
      clearTimeout(timer)
    }
  }, [search, products ,setSearchParams])

  const productsFetch = async () => {
    const response = await getApi('/products/my_products',)
    let result = await response.json()
    setProducts(result.products)
    setRequests(result.requests)
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

  const handleDelete = async (product) => {
    console.log(product);
    let response = await deleteApi('/products', product.id)
    if (response.status == 200) {
      productsFetch()
      toast('Product deleted successfully')
    }
  }

  const handleEdit = async (product) => {
    let error = validateProduct(product.name, product.description, product.price, product.category, product.image)
    if (error) {
      console.log(error);
      setError(error)
      return error
    }
    setError('')
    let response = await editApi('/products', product.id, product)
    if (response.status == 200) {
      productsFetch()
      toast('Product edited successfully')
    }
  }

  const handleAddProduct=async(product)=>{
    setIsLoading(true)
    product.image = await uploadImageToCloudinary(product.image)
    let response = await postApi('/products',product,"product")
    console.log(response)
    if(response.status == 201){
    setIsToggle(!isToggle)
    setIsLoading(false)
    setError('')
    toast("Product added successfully") 
    }

  }
  const handleRequestAccept=async(requestId)=>{
    let response = await editApi('/requests',requestId,{action:"accepted"})
    if(response.status == 200){
      productsFetch()
      setIsRequestProductToggle(false)
      toast('Accepted Successfully')
    }
  }

const handleSearchChange=(e)=>{
  const value = e.target.value;
  setSearchParams(value ? { search: value } : {});
  
}
  
  


  const handleRequestReject=async(requestId)=>{
    let response = await editApi('/requests',requestId,{action:"rejected"})
    if(response.status == 200){
      productsFetch()
      setIsRequestProductToggle(false)
      toast('Rejected Successfully')

    }
    

  }

  if (filteredProducts == null) {
    return (<ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />)
  }

  return (
    <>
      {isToggle ? <AddProduct onAdd={handleAddProduct} isLoading={isLoading} setIsToggle={setIsToggle} error={error} setError={setError}/> :
        <div className='flex bg-white'>
          <div className=' w-full'>
            <div className='flex justify-between items-center mt-10'>
              <div>
              <button onClick={() => setIsToggle(true)} className='bg-blue-800 text-white rounded-lg p-2 ml-10 hover:bg-blue-700'>Add Products</button>
              </div>
            
            <form onSubmit={(e)=>e.preventDefault()} class="flex items-center mx-36">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input
        onChange={handleSearchChange}
      type="text"
      id="simple-search"
      class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search Product..."
      required
    />
    </div>
    <button onClick={handleSubmit} class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search</span>
    </button>
</form>

            </div>
           

            {
              filteredProducts.length > 0 ? <MyProductList products={filteredProducts} requests={requests} onDelete={handleDelete} onEdit={handleEdit} error={error} setError={setError} onAccept={handleRequestAccept}
              isRequestProductToggle={isRequestProductToggle} setIsRequestProductToggle={setIsRequestProductToggle} onReject={handleRequestReject} /> : <p className='align-middle justify-center flex mt-40 font-bold text-4xl'>No Products</p>
            }
          </div>
        </div>}
    </>
  )
}
export default MyProducts