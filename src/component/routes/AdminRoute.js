import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/auth";
import axios from "axios";
import {Outlet} from "react-router-dom";
import Loading from "./loading";

const AdminRoute = () => {
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    useEffect(()=>{
            if(auth?.token){
                checkAdmin().then(data =>{
                    if(data.isAdmin === true){
                        setOk(true)
                    }else{
                        setOk(false)
                    }
                })
            }
    },[auth?.token])
    const checkAdmin=async ()=>{
        const {data}=await axios.get('/check-admin');
        return data;
    }
    return ok ? <Outlet></Outlet> : <Loading path={''}></Loading>
};

export default AdminRoute;