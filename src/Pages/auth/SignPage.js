import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useLoading} from "../../hooks/loading";

const SignPage = () => {
    const [isLoading, toggleLoading ]=useLoading()
    const navigate=useNavigate()
    const[email,setEmail]=useState('')
    const[fistName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('');
    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            if(password!==confirmPassword){
                toast.error('password and confirm password not match');
            }else{
                const payload={

                    email:email,
                    firstName:fistName,
                    lastName:lastName,
                    password:password
                };
                toggleLoading()
                const {data}= await axios.post('/registration',payload);
                if(data.status === "success")
                {navigate('/login')
                    toast.success("registration success")
                    toggleLoading()
                }
                else{
                  toast.error('something wrong')
                    toggleLoading()
                }
            }
        }
        catch (e) {
            toast.error('something wrong')
        }
    }
    return (
        <div>
            <div className='w-full'>

                <div className='w-96 rounded-md h-auto flex flex-col border-2 mx-auto mt-4  outline-none'>
                    {isLoading &&      <div className='flex flex-col items-center'>
                        <h1 className='text-center p-2'>loading</h1>
                        <progress className="progress w-full"></progress>
                    </div>
                    }
                    <h1 className='text-3xl p-4 text-center'>Please Sign Up</h1>

                    <form  className='flex flex-col items-center w-full '>

                        <input onChange={e=>setEmail(e.target.value)}  className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700' placeholder='Enter Your Valid Email' required type="email" name="" id="email" />
                        <input onChange={e=>setFirstName(e.target.value)} className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700' placeholder='Enter Your First Name' required type="text" name="" id="name" />
                        <input onChange={e=>setLastName(e.target.value)} className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700' placeholder='Enter Your last Name' required type="text" name="" id="mobile Number" />
                        <input onChange={e=>setPassword(e.target.value)}  className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700' placeholder='Password' required type="password" name="" id="password" />
                        <input onChange={e=>setConfirmPassword(e.target.value)}  className='border-2 my-4 p-2 border-blue-600 rounded-md w-3/4 outline-none focus:border-green-700' placeholder='Confirm Password' required type="password" name="" id="confirmPAssword" />
                        <input onClick={handleSubmit} className='bg-blue-600  hover:bg-blue-800 my-4 focus:bg-blue-700 font-semibold p-2 rounded-md w-3/4 cursor-pointer' type="submit" value="submit" />
                    </form>
                    <p className='text-center py-2'>Already SignUp please  <Link to='/login' className='text-blue-600' >Login</Link></p>
                    <div className='flex justify-center items-center'>
                        <div className='w-28 border-2 border-b-slate-700'></div>
                        <p className='p-2'>or</p>
                        <div className='w-28 border-2 border-b-slate-700'></div>
                    </div>
                </div>

            </div>
            );
            };
        </div>
    );
};

export default SignPage;