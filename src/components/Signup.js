import React, { useRef, useState } from 'react';
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuth } from '../redux/slice/toggleSlice';
import validateFields from '../utils/validation';
import auth from '../helper/auth';
import { addUser } from '../redux/slice/userSlice';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { storeToken } from '../helper/token';


const Signup = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    let isLogin = useSelector(state => state.toggle.authToggle)
    let username = useRef(null)
    let email = useRef(null)
    let password = useRef(null)
    let navigate = useNavigate()


    const handleSubmit = async () => {

        let error = validateFields(email.current.value, password.current.value, isLogin ? null : username.current.value)
        if (error) {
            return setErrorMessage(error)
        }
        setIsLoading(true)
        let response = await auth(email.current.value, password.current.value, isLogin ? null : username.current.value, isLogin)



        if (response.status == 201 || response.status == 200) {
            let result = await response.json()


            await dispatch(addUser({ id: result.user._id, email: result.user.email, username: result.user.username }))
            const token = await response.headers.get('Authorization');
           
            await storeToken(token)
            navigate('/products')
            toast("Welcome to Deal Zone")
        } else {
            let result = await response.json()
           setErrorMessage(result.user.message)
        }
        setIsLoading(false)

    };

    return (
        <div className="flex  items-center justify-center overflow-hidden ">
            <div className="flex w-full max-w-6xl gap-10 p-4 mt-10 ">
                <div className="flex-1 flex items-center justify-center">
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/fc5f95e1-ea84-44e4-a977-121d252aeea6/thfik9chYV.json"
                        className="w-full max-w-lg"

                    />
                </div>


                <div className="flex-1">
                    <div className="w-full max-w-md rounded-lg border border-gray-300 p-8 shadow-sm">
                        <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">
                            {isLogin ? "Log In" : "Sign Up"}

                        </h1>
                        {errorMessage && <p className='text-red-700 text-center'>{errorMessage}</p>}

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            {
                                !isLogin && (
                                    <div className="space-y-2">

                                        <label
                                            htmlFor="name"
                                            className="block font-bold text-blue-800 text-xl"
                                        >
                                            Name
                                        </label>
                                        <input
                                            ref={username}

                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                )
                            }


                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block font-bold text-blue-800 text-xl"
                                >
                                    Email
                                </label>
                                <input
                                    ref={email}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block font-bold text-blue-800 text-xl"
                                >
                                    Password
                                </label>
                                <input
                                    ref={password}
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {
                                    isLoading ? <ClipLoader
                                        color='#ffffff'
                                        loading={isLoading}
                                        size={30}

                                    /> :
                                        isLogin ? "Log In" : "Sign Up"
                                }

                            </button>
                            {isLogin ? <p className='text-blue-800'>Don't have an account? <span onClick={() => dispatch(toggleAuth())} className='cursor-pointer'>SignUp</span></p> : <p className='text-blue-800'>If you already have an account? <span onClick={() => dispatch(toggleAuth())} className='cursor-pointer'>LogIn</span></p>}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;