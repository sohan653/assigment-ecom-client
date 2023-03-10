import React from 'react';
import {useAuth} from "../../hooks/auth";
import CustomLink from "../../component/CustomLink";
import {Outlet} from "react-router-dom";

const UserDashBoard = () => {
    const [auth,setAuth]=useAuth()
    return (
        <div className='grid grid-cols-4'>
            <div className='col-span-1 bg-dark'>

                <div
                    className="bg-dark overflow-y-scroll w-auto h-auto antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
                    <div className="flex flex-col relative  ">
                        <div id="menu"
                             className="  z-10 text-slate-300 w-64 h-screen ">
                            <div id="logo" className="my-4 px-6">
                                <p className={'text-2xl'}>User</p>
                                <h1 className="text-lg md:text-2xl font-bold text-white">Dash<span
                                    className="text-blue-500">Board</span></h1>

                            </div>
                            <div id="profile" className="px-6 py-10">
                                <p className="text-blue-500 text-3xl bold uppercase text-center">{auth.user.firstName}</p>

                            </div>
                            <div id="nav" className="w-full px-6">
                                <CustomLink to='/dashboard/user'
                                            class="w-full px-2 mb-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3   transition ease-linear duration-150">
                                    <div>
                                        {/*<BiTask/>*/}

                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold leading-5 text-white">My Order</span>
                                    </div>
                                </CustomLink>



                                <CustomLink to='/dashboard/user/order-status'
                                            class="w-full px-2 mb-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3   transition ease-linear duration-150">
                                    <div>
                                        {/*<BiTask/>*/}

                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold leading-5 text-white">Order Status</span>
                                    </div>
                                </CustomLink>








                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className='col-span-3 bg-slate-600 '>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default UserDashBoard;