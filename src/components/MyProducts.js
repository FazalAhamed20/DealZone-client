import React, { useEffect, useState } from 'react'
import { ShimmerPostList } from "react-shimmer-effects";
import { deleteApi, editApi, getApi, myProductSearchApi, postApi } from '../helper/api'
import AddProduct from '../utils/modal/AddProduct';
import MyProductList from './MyProductList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import { uploadImageToCloudinary } from '../helper/cloudinary';
import { useSearchParams } from 'react-router-dom';
import Search from './Search';

const MyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([])
  const [requests,setRequests] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [isToggle, setIsToggle] = useState(false)
  const [error, setError] = useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [isRequestProductToggle , setIsRequestProductToggle] = useState(false)
  const search = searchParams.get('search') || '';

  const fetchInitialProducts = async () => {
    const response = await getApi('/products/my_products?page=1');
    const result = await response.json();
    setProducts(result.products);
    setFilteredProducts(result.products);
    setRequests(result.requests)
    setHasMore(result.products.length > 0); 
  };

    useEffect(() => {
      
      fetchInitialProducts();
    }, []);

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

  const productsFetch = async (page=1,append=true) => {
    console.log(page);
    
    const response = await getApi(`/products/my_products?page=${page}`)
    let result = await response.json()
    if (result.status === 500) {
      setHasMore(false);
    } else {
      const newProducts = result.products;
      setHasMore(newProducts.length > 0); 
      if (append) {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setFilteredProducts(prevProducts => [...prevProducts, ...newProducts]);
        setRequests(result.requests)
      } else {
        setProducts(newProducts);
        setFilteredProducts(newProducts);
        setRequests(result.requests)
      }
    }
  };
    
  

  useEffect(() => {
    if(page>1){
      productsFetch(page)
    }
 
  }, [page])

  const handleSubmit = async () => {
    if (search) {
      let response = await myProductSearchApi(search);
      setFilteredProducts(response)
    } else {
      setFilteredProducts(products)
    }
  }

  const handleDelete = async (product) => {
    let response = await deleteApi('/products', product.id)
    if (response.status == 200) {
      fetchInitialProducts()
      setPage(1)
      toast.success('Product deleted successfully')
    }
  }

  const handleEdit = async (product) => {
  
     setIsLoading(true)
    let response = await editApi('/products', product.id, product)
    if (response.status == 200) {
      fetchInitialProducts()
      setPage(1)
      setIsLoading(false)
      toast.success('Product edited successfully')
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
    fetchInitialProducts()
    setPage(1)
    toast.success("Product added successfully") 
    }

  }
  const handleRequestAccept=async(requestId)=>{
    let response = await editApi('/requests',requestId,{action:"accepted"})
    if(response.status == 200){
     fetchInitialProducts()
     setPage(1)
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
      fetchInitialProducts()
      setPage(1)
      setIsRequestProductToggle(false)
      toast.success('Rejected Successfully')

    }
    

  }

  if (filteredProducts === null) {
     return (
       <div style={{ width: '100%', height: '10vh' }}> 
         <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={2} gap={30} />
       </div>
     );
   }

  return (
    <>
      {isToggle ? <AddProduct onAdd={handleAddProduct} isLoading={isLoading} setIsToggle={setIsToggle} error={error} setError={setError}/> :
        <div className='flex bg-white '>
          <div className=' w-full overflow-y-hidden'>
            <div className='flex justify-between items-center mt-10 mb-2'>
              <div>
              <button onClick={() => setIsToggle(true)} className='bg-blue-800 text-white rounded-lg p-2 ml-10 hover:bg-blue-700'>Add Products</button>
              </div>
              <div className='mr-10'>
              <Search handleSearchChange={handleSearchChange} handleSubmit={handleSubmit}/>
              </div>
            </div>
           {filteredProducts.length > 0 ? (
                     <div id='scrollableDiv' className="overflow-y-auto" style={{ height: '70vh' }}> 
                     <InfiniteScroll
                       dataLength={filteredProducts.length}
                       next={() => setPage((prevPage) => prevPage + 1)}
                       hasMore={hasMore}
                       loader={
                         <div className="m-28 mt-0">
                         <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={1} gap={30} />
                       </div>
                       }
                       endMessage={
                         <p className="text-center text-gray-500 my-4">
                           No more products
                         </p>
                       }
                       scrollableTarget="scrollableDiv"
                     >
              <MyProductList products={filteredProducts} requests={requests} onDelete={handleDelete} onEdit={handleEdit} error={error} setError={setError} onAccept={handleRequestAccept} isLoading={isLoading} setIsLoading={setIsLoading}
              isRequestProductToggle={isRequestProductToggle} setIsRequestProductToggle={setIsRequestProductToggle} onReject={handleRequestReject} />
                </InfiniteScroll>
                     </div>
                      ) : (
               <p className='align-middle justify-center flex mt-40 font-bold text-4xl'>No Products</p>
              )}
          </div>
        </div>
        }
    </>
  )
}
export default MyProducts