import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLoading} from "../hooks/loading";
import { Audio } from 'react-loader-spinner'
import ProductCard from "../component/productCard";
import ScreenLoader from "../component/ScreenLoader";

const ShopPage = () => {
    const [isLoading, toggleLoading ]=useLoading()
    const [products,setProducts]=useState([])
    useEffect( ()=>{

       getData()
    },[])

    const getData=async ()=>{
        toggleLoading()
        const {data}= await axios.get('/list-products')

        if(data?.status==="success"){
            toggleLoading()
            setProducts(data.data)
        }
    }
    if(isLoading) {
        return <ScreenLoader></ScreenLoader>

    }
    return (
        <div className={'p-14  h-auto  '}>
            <h1 className={'text-center text-3xl text-secondary pb-5'}>Our Products</h1>
            <div className={'flex justify-center flex-wrap gap-5'}>

            {
                products.map(product => <ProductCard product={product} ></ProductCard>)
            }
            </div>
        </div>
    );
};

export default ShopPage;