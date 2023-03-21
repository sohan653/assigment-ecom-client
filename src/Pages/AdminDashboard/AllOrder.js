import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const AllOrder = () => {
    const navigate=useNavigate()
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        axios.get('/all-orders')
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

                                    <button onClick={()=>navigate(`/dashboard/admin/order/${order._id}`)} className='btn btn-secondary py-1 mr-2'>View Order</button>

                                </td>

                            </tr>
                        )
                    })

                }
                {
                    orders.length ===0 ? <tr className={'text-center'}>
                        <td colSpan={3}>There is no orders</td>
                    </tr> : ""
                }
                </tbody>

            </table>

        </div>
    );
};

export default AllOrder;