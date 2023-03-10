import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useCart} from "../hooks/cart";
import {useLoading} from "../hooks/loading";
import ScreenLoader from "../component/ScreenLoader";

const ProductDetails = () => {
    const [isLoading,toggleLoading]=useLoading()
    const [product,setProduct]=useState({})
    const {slug}=useParams();
    const {addToCart}=useCart()
    useEffect(()=>{
            getData()
    },[])
    const getData=async ()=>{
        const url= `/read-product/${slug}`
        const {data}=await axios.get(url)
        if(data?.status==="success"){
            setProduct(data.data)
        }
    }
   if(isLoading){
       return <ScreenLoader></ScreenLoader>
   }
    return (
        <div className="bg-dark  rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <h2 className="text-xl font-semibold uppercase mb-2 md:mb-0">{product.name}</h2>
                <span className="text-white"><span className={'font-bold'}>Price:</span> {product.price}$</span>
                <span className="text-white"><span className={'font-bold'}>Quantity:</span>{product.quantity}</span>
            </div>
            <div className="flex flex-col md:flex-row justify-center mb-4">
                <div className="flex flex-col mb-2 md:mb-0">
                   <img className={'w-[400px]'} src={product.photoUrl} />
                </div>

            </div>
            <p className=" text-white text-center mb-4"><span className={'font-bold'}>Description:</span> {product.description}</p>
            <div className="flex justify-center items-center">

                    <button onClick={()=>{addToCart(product)}} className="ml-4 px-4 py-2 rounded-md bg-primary text-white">Add to cart</button>
            </div>
        </div>

    );
};

export default ProductDetails;