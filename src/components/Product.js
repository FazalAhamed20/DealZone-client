import React, { useEffect, useState } from 'react';
import { ShimmerPostList } from "react-shimmer-effects";
import ProductList from './ProductList';
import { getApi, postApi, productSearchCategoriesApi, searchApi } from '../helper/api';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategories } from '../redux/slice/toggleSlice';
import { toast } from 'react-toastify';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();
  const isToggle = useSelector(state => state.toggle.categoriesToggle);
  const [isRequestToggle, setIsRequestToggle] = useState(false);
  const search = searchParams.get('search') || '';
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
  }, [search, products, setSearchParams]);

  const productsFetch = async () => {
    const response = await getApi('/products');
    const result = await response.json();
    setProducts(result.products);
    setFilteredProducts(result.products);
  };

  useEffect(() => {
    productsFetch();
  }, []);

  const handleSubmit = async () => {
    if (search) {
      const response = await searchApi(search);
      setFilteredProducts(response);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleProductCategories = async (category) => {
    setSelectedCategory(category);
    if (category == "All"){
      setFilteredProducts(products)
      dispatch(toggleCategories());

    }else{
      const response = await productSearchCategoriesApi(category);
      setFilteredProducts(response.products);
      dispatch(toggleCategories());

    }
  
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  const handleRequestSubmit = async (request_amount, product_id) => {
    const response = await postApi('/requests', { request_amount, product_id }, "product");
    if (response.status === 200) {
      setIsRequestToggle(false);
      productsFetch();
      toast("Request sent successfully");
    }
  };

  const uniqueCategories = ["All",...new Set(products.map(product => product.category))];

  if (filteredProducts === null) {
    return <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />;
  }

  return (
    <div className="w-full px-4">
  <div className="max-w-6xl mx-auto mt-10">
    <div className="flex justify-between items-center">
      <div className="relative flex items-center">
        <h1 className="text-lg font-medium inline-block mr-2">Categories:</h1>
        <button
          onClick={() => dispatch(toggleCategories())}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {selectedCategory} <ChevronDown size={16} />
        </button>

        {isToggle && (
          <div className="absolute right-0 bg-white shadow-lg border border-gray-300 rounded-md mt-2 z-10 min-w-[150px]">
            {uniqueCategories.map(category => (
              <div
                key={category}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleProductCategories(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative flex items-center">
       

      <form onSubmit={(e)=>e.preventDefault()} class="flex items-center max-w-sm mx-auto">   
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
    </div>

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
  </div>
</div>

  );
};

export default Product;