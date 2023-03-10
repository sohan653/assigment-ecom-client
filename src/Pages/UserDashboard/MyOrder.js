import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const MyOrder = () => {
    const navigate=useNavigate()
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        axios.get('/my-orders')
            .then(res => {
                if(res.data.data.length >0){
                    setOrders(res.data.data)
                }
            })
            .catch()
    })
    return (
        <div className="overflow-x-auto ">
            <h1 className={'bg-dark text-center text-white text-4xl font-bold'}>Order List</h1>
            <table className="table  w-full my-5 ">
                <thead className=''>
                <tr className='text-center'>
                    <th>Order Id</th>
                    <th>Payment Status</th>
                    <th> Action </th>

                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order,index)=>{
                        return (
                            <tr className={'text-center'}>
                                <td>{order._id}</td>
                                <td>{order.isPay}</td>

                                <td className=''>

                                    <button onClick={()=>navigate(`/dashboard/admin/`)} className='btn btn-secondary py-1 mr-2'>View Order</button>
                                    { order.isPay === "unpaid" ?  <button onClick={()=>navigate(`/dashboard/admin/`)} className='btn btn-primary py-1'>checkout</button> :""}
                                </td>

                            </tr>
                        )
                    })

                }
                {
                    orders.length ===0 ? <tr className={'text-center'}>
                        <td colSpan={3}>You Have no Orders ,Go to Cart Page <Link className={'btn btn-primary'} to={'/cart'}>Click Here</Link> </td>
                    </tr> : ""
                }
                </tbody>

            </table>

        </div>
    );
};

export default MyOrder;