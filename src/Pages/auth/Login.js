import React, {useState} from 'react';
import axios from "axios";
import {useAuth} from "../../hooks/auth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useLoading} from "../../hooks/loading";

const Login = () => {
    const [isLoading, toggleLoading ]=useLoading()
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    const location=useLocation()
    const [password,setPassword] =useState('');
    const [email,setEmail] =useState('');
    const handleSubmit= async (e)=>{
        e.preventDefault()
       try {
            toggleLoading()
           const {data}=await axios.post('/login',{email,password})
           if(data.status === "success"){
               toggleLoading()
               localStorage.setItem("auth", JSON.stringify(data));
               setAuth({ ...auth, token: data.token, user: data.data });
               toast.success("Login successful");
               navigate(
                   location.state ||
                   `/dashboard/${data?.data?.role === "admin" ? "admin" : "user"}`
               );
           }else{
               toggleLoading();
               toast.error('user or password dont match')
           }
       }
       catch (e) {
            toggleLoading()
       }
    }
    return (
        <div>
            <div className='w-full h-[574px] mb-6  box-border'>

                <div className='w-96 rounded-md  flex flex-col border-2 mx-auto mt-4  outline-none'>
                    {isLoading &&      <div className='flex flex-col items-center'>
                        <h1 className='text-center p-2'>loading</h1>
                        <progress className="progress w-full"></progress>
                    </div>
                    }
                    <h1 className='text-3xl p-4 text-center'> Login</h1>
                    <div className='flex flex-col items-center w-full '>

                        <input onChange={(e) => setEmail(e.target.value)} autoComplete="off"
                               className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700'
                               placeholder='Enter Your Valid Email' type="email" required name="" id=""/>

                        <input onChange={(e) => setPassword(e.target.value)} autoComplete="off"
                               className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700'
                               placeholder='Enter Your Password' type="password" required name="" id=""/>
                        <input onClick={handleSubmit}
                               className='bg-blue-600  hover:bg-blue-800 my-4 focus:bg-yellow-700 font-semibold p-2 rounded-md w-3/4 cursor-pointer'
                               type="submit" value="Log in"/>
                    </div>
                    <Link to='/create-otp' className='text-blue-600 text-center'>forgot password</Link>
                    <p className='text-center py-2'>Not Sign Up please <Link to='/signup' className='text-blue-600'
                                                                            >sign up</Link></p>
                    <div className='flex justify-center items-center'>
                        <div className='w-28 border-2 border-b-slate-700'></div>
                        <p className='p-2'>*</p>
                        <div className='w-28 border-2 border-b-slate-700'></div>
                    </div>


                </div>


            </div>

        </div>
    );
};

export default Login;