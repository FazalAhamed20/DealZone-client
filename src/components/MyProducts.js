import React, { useEffect, useState } from 'react'
import { ShimmerPostList } from "react-shimmer-effects";
import { deleteApi, editApi, getApi, myProductSearchApi, postApi } from '../helper/api'
import AddProduct from '../utils/modal/AddProduct';
import MyProductList from './MyProductList';
import { toast } from 'react-toastify';
import { validateProduct } from '../utils/validateProducts';
import { uploadImageToCloudinary } from '../helper/cloudinary';

const MyProducts = () => {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [requests,setRequests] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [isToggle, setIsToggle] = useState(false)
  const [error, setError] = useState('')
  const [isLoading,setIsLoading]=useState(false)
    const [isRequestProductToggle , setIsRequestProductToggle] = useState(false)

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
      clearTimeout(timer)
    }
  }, [search, products])

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
    let error = validateProduct(product.name, product.description, product.price, product.category, product.image)
    console.log(error);
    
    if (error) {
      setIsLoading(false)
      return setError(error)
    }
    let response = await postApi('/products',product)
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

  console.log(requests);
  
  


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
            <div className='justify-center align-middle flex mt-10 '>
              <input onChange={(e) => setSearch(e.target.value)}
                className='border border-black w-96 rounded-l-lg p-1 ' type='text' placeholder='Search Product' value={search} />
              <button className='border border-black rounded-r-lg w-14' onClick={handleSubmit}>🔍</button>
            </div>
            <button onClick={() => setIsToggle(true)} className='bg-blue-800 text-white rounded-lg p-2 ml-10 hover:bg-blue-700'>Add Products</button>
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