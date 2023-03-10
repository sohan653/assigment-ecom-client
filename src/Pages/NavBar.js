import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import {useAuth} from "../hooks/auth";
import {useCart} from "../hooks/cart";
const logolink='https://th.bing.com/th/id/R.b98ab30f6459f39fcd327a100716b63c?rik=uk13f3TdnyIpVA&riu=http%3a%2f%2fwww.techshop.com.pt%2fTechShop-Images%2fTech-Shop-Logo.png&ehk=E2rN8l4387pneYkShPL3A2hcqzPPyfq3y%2b4QcFtKspI%3d&risl=&pid=ImgRaw&r=0'
const NavBar = ({children}) => {
    const navigate=useNavigate();
    const [user,setuser]=useState({});
    const [auth,setAuth]=useAuth()
    const {cartItems, addToCart }=useCart();


    const logout =()=>{
        localStorage.removeItem('auth');
        toast('Logged out')
        window.location.href="/"
    }

    return (
        <div>
            <div className="drawer  mb-10">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* <!-- Navbar --> */}
                    <div className="w-full navbar bg-success ">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">
                            {/* drawer */}
                           <ul>
                               <li> <Link to={'/'}> <img src={logolink} className={'w-20'}/></Link>
                               </li>

                           </ul>

                        </div>
                        <div className={'flex-1'}>
                            <ul>
                                <li> <NavLink className={'text-xl text-blue-800'} to={'/shop'}>Shop Now</NavLink> </li>

                            </ul>
                        </div>

                        <div className={'flex-1'}>
                            <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
                                <Link to={'/cart'} role="button" className="relative flex">
                                    <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24">
                                        <path
                                            d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                                    </svg>
                                    <span
                                        className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cartItems.length}
                                      </span>
                                </Link>
                            </li>
                        </div>


                        {
                            auth.user ? <div className="dropdown dropdown-bottom dropdown-end">
                                <label tabIndex="0" className=" m-1">
                                    <img className='w-8 mr-3  '
                                         src="https://th.bing.com/th/id/R.e57e5808c9ce3679c17ed47fd7cd12d2?rik=NH5wGpiO%2b3mPFg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_258083.png&ehk=zTjdaif7gRiY5rck%2floyeZ8JEjXMWuj7xbBvkxxjY3M%3d&risl=&pid=ImgRaw&r=0"
                                         alt=""/>

                                </label>
                                <ul tabIndex="0"
                                    className="dropdown-content menu p-2 mr-3 shadow bg-slate-700 rounded-box w-52">
                                    <h1 className='text-blue-500 text-3xl bold uppercase text-center'>{user.name}</h1>
                                    <li><Link className='text-blue-500 text-xl bold btn btn-outline m-3'
                                              to='/update-profile'>Profile</Link></li>
                                    <li><Link className='text-blue-500 text-xl bold btn btn-outline m-3 '
                                              to={`/dashboard/${auth.user.role==="admin"? "admin":"user"}`}>DashBoard</Link></li>
                                    <li onClick={logout} className='text-blue-500 text-xl bold btn btn-outline m-3'>Log
                                        Out
                                    </li>
                                </ul>
                            </div> : <p> <Link className={'text-black'} to={'login'}>Login</Link> </p>
                        }

                    </div>
                    {/* <!-- Page content here --> */}
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100">
                        {/* <!-- Sidebar content here --> */}
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default NavBar;