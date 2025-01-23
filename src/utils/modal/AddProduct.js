import React, { useRef} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from 'react-spinners'
import { productValidation } from '../validation';

const AddProduct = ({onAdd,isLoading,setIsToggle,error,setError}) => {
  let image = useRef()

  const handleSubmit=async(values)=>{
    console.log(image.current.files[0]);
    if(image.current.files[0] == null ){
      setError("Image not found")
    }else{
      console.log(values);
    onAdd({...values,image:image.current.files[0]})
    }
    
  }

  const handleClose=()=>{
    setError('')
    setIsToggle(false)

  }

  console.log("error",error);
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm flex  justify-center items-center">
      <Formik
      initialValues={{name:'',description:'',category:'',price:null,image:null}}
      validationSchema={productValidation}
      onSubmit={handleSubmit}
      >
        {({errors,touched})=>(
      
      <Form className='bg-white p-10 rounded shadow-md w-full max-w-lg'>
       
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
            Name
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && touched.name && "border-red-500"}`}
            type='text'
             name="name"
            placeholder='Enter product name'
          />
            <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
            Description
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description && touched.description && "border-red-500"}`}
            type='text'
            name="description"
            placeholder='Enter product description'
          />
            <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
            Price
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price && touched.price && "border-red-500"}`}
            type='number'
            name="price"
            placeholder='Enter product price'
          />
            <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='category'>
            Category
          </label>
          <Field
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.category && touched.category && "border-red-500"}`}
            type='text'
            name='category'
            placeholder='Enter product category'
          />
            <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-600" />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
         Image
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username && touched.username && "border-red-500"}`}
            type='file'
            ref={image}
            accept='image/*'
            name='image'
            placeholder='Image'
          />
            {error && <p className='text-red-500 font-bold text-sm'>{error}</p>}
        </div>
        <div className='flex items-center gap-5'>
          <button
            className='bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        
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
      </Form>
      )}
      </Formik>
    </div>
  )
}

export default AddProduct
