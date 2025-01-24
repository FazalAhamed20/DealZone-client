import React, { useEffect, useState } from 'react';
import { ShimmerPostList } from "react-shimmer-effects";
import ProductList from './ProductList';
import { getApi, postApi, productSearchCategoriesApi, productSearchFilterApi, searchApi } from '../helper/api';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import Search from './Search';
import Filter from './Filter';
import useCategories from '../hooks/useCategories';

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryParams,setCategoryParams] = useSearchParams()
  const [filterParams,setFilterParams] = useSearchParams()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [isRequestToggle, setIsRequestToggle] = useState(false);
  const search = searchParams.get('search') || '';
  const category = categoryParams.get('category') || ""
  const filter =filterParams.get('filter')|| ""

  useEffect(() => {
    const fetchInitialProducts = async () => {
      const response = await getApi('/products?page=1');
      const result = await response.json();
      setProducts(result.products);
      setFilteredProducts(result.products);
      setHasMore(result.products.length > 0); 
    };

    fetchInitialProducts();
 
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search) {
        const response = await searchApi(search);
        setFilteredProducts(response);
        setSearchParams({ search: search });
      } else {
        setSearchParams({});
        setFilteredProducts(products);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [search, products]);


  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        if (category === "All") {
          setFilteredProducts(products);
          setCategoryParams({});
        } else {
          const response = await productSearchCategoriesApi(category);
          console.log(response);
          
          setFilteredProducts(response.products);
          setCategoryParams({ category: category });
        }
      }
    };

    fetchData();
  }, [category, products]);

  useEffect(()=>{
    const fetchFilter=async()=>{
      if(filter){
        if(filter == "Select Filter"){
          setFilteredProducts(products)
          setFilterParams({})
        }else{
          const response = await productSearchFilterApi(filter)
          console.log(response);
          
          setFilteredProducts(response);
          setCategoryParams({ filter: filter });
        }
      }
    }
    fetchFilter()
  },[products,filter])

  let categories = useCategories()

  

  

  const productsFetch = async (page, append = true) => {

    const response = await getApi(`/products?page=${page}`);
    const result = await response.json();
    if (result.status === 500) {
      setHasMore(false);
    } else {
      const newProducts = result.products;
      setHasMore(newProducts.length > 0); 
      if (append) {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setFilteredProducts(prevProducts => [...prevProducts, ...newProducts]);
      } else {
        setProducts(newProducts);
        setFilteredProducts(newProducts);
      }
    }
  };



  useEffect(() => {
    if (page > 1) {
      productsFetch(page);
    }
  }, [page]);

  const handleSubmit = async () => {
    if (search) {
      const response = await searchApi(search);
      setFilteredProducts(response);
    } else {
      setFilteredProducts(products);
    }
  };



  const handleProductCategories = async (category) => {
    let value=category
    setSelectedCategory(value)
    setCategoryParams(value ? {category:value}:{})
  };

  const handleProductFilter=async(filter)=>{
   let value=filter
    setFilterParams(value ? {filter:value}:{})
   
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  const handleRequestSubmit = async (request_amount, product_id) => {
    const response = await postApi('/requests', { request_amount, product_id }, "product");
    if (response.status === 200) {
      setIsRequestToggle(false);
      await productsFetch(1, false);  
      setPage(2); 
      toast("Request sent successfully");
    }
  };

  const uniqueCategories = ["All", ...(categories.map(product => product.category))];

  if (filteredProducts == null) {
    return (
      <div style={{ width: '100%', height: '10vh' }}> 
        <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={2} gap={30} />
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <div className="max-w-6xl mx-auto mt-10 ">
        <div className="flex justify-between items-center mb-10 ">
          <div className="relative flex items-center gap-4">
            <div className="flex items-center">
              <h1 className="text-lg font-medium inline-block mr-2">Categories:</h1>
              <select
                className="border border-black rounded-lg py-2"
                onChange={(e) => handleProductCategories(e.target.value)}
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <Filter handleProductFilter={handleProductFilter}/>
            </div>
          </div>
          <div className="relative flex items-center">
            <Search handleSearchChange={handleSearchChange} handleSubmit={handleSubmit} />
          </div>
        </div>
  
        {filteredProducts.length > 0 ? (
          // <div id='scrollableDiv' className="overflow-y-auto" style={{ height: '70vh' }}> 
          <InfiniteScroll
            dataLength={filteredProducts.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={<ShimmerPostList postStyle="STYLE_FOUR" col={4} row={1} gap={30} size={100} />}
            endMessage={
              <p className="text-center text-gray-500 my-4">
                No more products
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            {filteredProducts.length > 0 ? (
              <ProductList
                products={filteredProducts}
                onRequestSubmit={handleRequestSubmit}
                isRequestToggle={isRequestToggle}
                setIsRequestToggle={setIsRequestToggle}
                selectedCategory={selectedCategory}
              />
            ) : (
              <p className="text-center mt-40 font-bold text-4xl">No Products</p>
            )}
          </InfiniteScroll>
        // </div>
        ) : (
          <p className="text-center mt-40 font-bold text-4xl">No Products</p>
        )}
      </div>
    </div>
  );
}

export default Product;