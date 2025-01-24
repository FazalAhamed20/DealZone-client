import React, { useState } from 'react'
import { Player } from "@lottiefiles/react-lottie-player";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidation } from '../utils/validation';
import { ClipLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { postApi } from '../helper/api';
import { storeToken } from '../helper/token';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addUser } from '../redux/slice/userSlice';

const Login = () => {
        const [isLoading, setIsLoading] = useState(false)
        let navigate = useNavigate()
            let dispatch = useDispatch()

        const handleSubmit=async(values)=>{
            setIsLoading(true)
            
            try {
                console.log(values);
           
                            let response = await postApi('/session', values, "user")
                            console.log(response);
                            if (response.status == 200) {
                                let result = await response.json()
                
                
                              dispatch(addUser({ id: result.user._id, email: result.user.email, username: result.user.username }))
                                const token = response.headers.get('Authorization');
                
                                storeToken(token)
                                navigate('/products')
                                toast.success("Welcome to Deal Zone")
                            } else {
                                let result = await response.json()
                                toast.error(result.user.message)
                            }
                
                
                
                
            } catch (error) {
                toast.error(error.message)
                
            }finally{
                setIsLoading(false)
            }

        }
  return (
    <div className="flex  items-center justify-center overflow-hidden mt-10 ">
    <div className="flex w-full max-w-6xl gap-10 p-4 mt-10 ">
        <div className="flex-1 flex items-center justify-center">
            <Player
                autoplay
                loop
                src="https://lottie.host/ae74045b-01ef-4d84-a64a-c3dd1a1771af/gnun6yk7DJ.json"
                className="w-full max-w-lg"

            />
        </div>


        <div className="flex-1">
            <div className="w-full max-w-md rounded-lg border border-gray-300 p-8 shadow-sm">
                <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">

                </h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginValidation}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (



                        <Form className="space-y-6">

                          




                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block font-bold text-blue-800 text-xl"
                                >
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email && touched.email && "border-red-500"
                                        }`}

                                />
                                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block font-bold text-blue-800 text-xl"
                                >
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password && touched.password && "border-red-500"
                                        }`}
                                />
                                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            <button
                                type='submit'
                                className="w-full rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {
                                    isLoading ? <ClipLoader
                                        color='#ffffff'
                                        loading={isLoading}
                                        size={30}

                                    /> :
                                        "Log In"
                                }

                            </button>
                            <p className='text-blue-800'>Don't have an account? <Link to="/"><span className='cursor-pointer'>Sign Up</span></Link></p>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login