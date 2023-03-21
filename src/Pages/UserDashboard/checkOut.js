import React, {useEffect, useState} from 'react';
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
const CheckOut = () => {
    const navigate=useNavigate()
    const {id,price}=useParams()
    const [value,setValue]=useState({
        clientToken:null,
        success:"",
        error:"",
        instance:""
    });
    useEffect(()=>{
        axios.get('/get-payment-token').then(response=>{

            setValue({...value,clientToken: response.data.data.clientToken})
        })
            .catch(e => console.log(e))
    },[]);
const {clientToken,instance}=value;
const checkOut=()=> {
    instance.requestPaymentMethod()
        .then(data=>{
                let nonce=data.nonce;
                axios.post(`/checkout/${id}`,{totalPrice:price,nonce:nonce})
                    .then(response => {
                        toast.success("payment successfully done");
                        navigate("/dashboard/user")
                    })
                    .catch(e=> toast.error("something wrong try again"))

            }
        )
}
    return (
        <div>
            checkout page

            <div>
                {clientToken ? <div className={'flex flex-col items-center '}> <DropIn
                    options={{ authorization:clientToken }}
                    onInstance={instance => setValue({...value,instance: instance}) }
                ></DropIn>
                    <button onClick={checkOut} className={'btn btn-primary'}>Confirm</button>
                </div> : <h1>loading</h1>}
            </div>
        </div>
    );
};

export default CheckOut;