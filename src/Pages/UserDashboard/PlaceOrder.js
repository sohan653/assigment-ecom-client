import React, {useEffect, useState} from 'react';
import {useCart} from "../../hooks/cart";
import {useAuth} from "../../hooks/auth";
import {toast} from "react-toastify";
import axios from "axios";
import {useLoading} from "../../hooks/loading";
import {useNavigate} from "react-router-dom";
import ScreenLoader from "../../component/ScreenLoader";

const PlaceOrder = () => {
    const navigate=useNavigate()
    const [isLoading,toggleLoading]=useLoading()
    const [auth]=useAuth()
    const { cartItems } = useCart();
    const [products,setProducts]=useState([])
    const [totalPrice,setTotalPrice]=useState('')
    const [numbers,setNumbers]=useState('')
    const [address,setAddress]=useState('')

    useEffect(()=>{
        const {products,totalPrice}=getOrderDataFromCart();
            setProducts(products);
            setTotalPrice(totalPrice);
    },[])
    const getOrderDataFromCart = () => {

        let totalPrice = 0;
        const products = cartItems.map((item) => {
            totalPrice += item.price * item.cartQuantity;
            return {
                _id: item._id,
                name: item.name,
                quantity: item.cartQuantity,
                price: item.price * item.cartQuantity,
            };
        });
        return { products, totalPrice }
    }
    const handleSubmit=async (e) =>{
        try{
           if(!numbers && !address) {
               toast.error('fill up number or address box')
           }else{
               toggleLoading()
               const orderPayload={
                   customerName:auth?.user?.firstName,
                   UserEmail:auth?.user?.email,
                   mobileNumber:numbers,
                   address:address,
                   productList:products,
                   totalPrice:totalPrice

               }
               if(auth?.token){
                   const {data}= await axios.post('create-order',orderPayload);
                   if(data.status ==="success"){
                       toast.success("place order successfully")
                       toggleLoading()
                       navigate('/dashboard/user')
                   }else{
                       toast.error('failed to place order');
                       toggleLoading()
                   }
               }
           }
        }
        catch (e) {
           toast.error("something wrong")
        }
    }
    if(isLoading){
        return <ScreenLoader></ScreenLoader>
    }
    return (
        <div>
            <div className="card grid grid-cols-5 lg:card-side bg-base-100 shadow-xl">
                <div className={'col-span-2 flex justify center'}>
                    <div className="card w-full bg-base-100 shadow-xl  border-2 ">
                        <div className="card-body">
                            <h2 className="card-title">{auth?.user?.firstName}</h2>
                            <p>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        {/* head*/}
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            products.map((product,index)=>{
                                                return (
                                                    <tr>
                                                       <td>{index+1}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.price}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                       <tr>
                                           <td className={'text-center'} colSpan={4}>
                                               TotalPrice : {totalPrice}
                                           </td>
                                       </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </p>

                        </div>
                    </div>
                </div>
                <div className="card-body border-2 rounded col-span-3">
                   <div className={'flex flex-col gap-4'}>
                       <input onChange={e => setNumbers(e.target.value)} type="text" placeholder="Type Your Mobile number" className="input input-bordered input-primary w-full max-w-xs" />
                       <textarea onChange={e => setAddress(e.target.value)} placeholder="Type Your Address" className="textarea textarea-bordered textarea-primary textarea-lg w-full max-w-xs" ></textarea>
                   </div>
                    <div className="card-actions justify-end">
                        <button onClick={handleSubmit} className="btn btn-primary">Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;