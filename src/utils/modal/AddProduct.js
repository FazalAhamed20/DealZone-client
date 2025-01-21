import React, { useRef} from 'react'

import { ClipLoader } from 'react-spinners'

const AddProduct = ({onAdd,isLoading,setIsToggle,error,setError}) => {

  let name=useRef()
  let description=useRef()
  let price=useRef()
  let category=useRef()
  let image=useRef()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    let addProduct={
      name: name.current.value,
      description: description.current.value,
      price: price.current.value,
      category: category.current.value,
      image: image.current.files[0]
    }
  
  onAdd(addProduct)
  }

  const handleClose=()=>{
    setError('')
    setIsToggle(false)

  }
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex  justify-center items-center">
      
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
           ref={image}
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
                                        size={40}

                                    /> :
                                   "Add Product"
                                        
                                }
           
          </button>
          {!isLoading && 
          <button
          className='bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={handleClose}
        
        >
         Cancel
        </button>
          }
          
        </div>
      </form>
    </div>
  )
}

export default AddProduct
