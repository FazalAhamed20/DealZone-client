import React, { useRef, useState } from 'react'
import { validateProduct } from '../validateProducts'
import { uploadImageToCloudinary } from '../../helper/cloudinary'
import { postApi } from '../../helper/api'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const AddProduct = ({isToggle,setIsToggle}) => {
  const [image,setImage]=useState('')
  const [error,setError]=useState('')
  const [isLoading,setIsLoading] = useState(false)
  let name=useRef()
  let description=useRef()
  let price=useRef()
  let category=useRef()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setIsLoading(true)
const url = await uploadImageToCloudinary(image)
let error = validateProduct(name.current.value,description.current.value,price.current.value,category.current.value,url)
if (error) {
  setIsLoading(false)
  return setError(error)
}

let response = await postApi('/products',{name: name.current.value, description: description.current.value, price: price.current.value, category: category.current.value, image: url})
console.log(response)
if(response.status == 201){
  console.log("hello");
setIsToggle(!isToggle)
setIsLoading(false)
toast("Product added successfully")
  
  
}
    

  }
  return (
    <div className='w-full  flex justify-center items-center bg-gray-300 p-8'>
      
      <form className='bg-white p-10 rounded shadow-md w-full max-w-lg'>
      {
        error && <h1 className='text-red-600'>{error}</h1>
      }
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
          ref={name}
            placeholder='Enter product name'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            ref={description}
            placeholder='Enter product description'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
            Price
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
           ref={price}
            placeholder='Enter product price'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
            Category
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
           ref={category}
            placeholder='Enter product category'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
         Image
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='file'
            accept='image/*'
          onChange={(e)=>setImage(e.target.files[0])}
            placeholder='Image'
          />
        </div>
        <div className='flex items-center gap-5'>
          <button
            className='bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
           onClick={handleSubmit}
          >
            {
                                    isLoading ? <ClipLoader
                                        color='#ffffff'
                                        loading={isLoading}
                                        size={30}

                                    /> :
                                   "Add Product"
                                        
                                }
           
          </button>
          <button
            className='bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={()=>setIsToggle(false)}
          
          >
           Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
