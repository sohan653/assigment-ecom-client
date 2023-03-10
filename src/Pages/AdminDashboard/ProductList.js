import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {useAuth} from "../../hooks/auth";
import {toast} from "react-toastify";
import ScreenLoader from "../../component/ScreenLoader";
import {useLoading} from "../../hooks/loading";

const ProductList = () => {
    const [isLoading,toggleLoading]=useLoading()
    const [laoding,setLoading]=useState((true))
    const navigate=useNavigate()
    const [auth,setAuth]=useAuth()

    const [products,setProducts]=useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData=async ()=>{
        toggleLoading()
        const {data}=await axios.get('/list-products');
        if(data.status === "success"){
            setProducts(data.data)
            toggleLoading()
        }
    }


    // delete products
    const deleteAlert=(id)=>{

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                toggleLoading()
                if(auth?.token){
                    axios.delete(`/delete-product/${id}`)
                        .then(data=>{
                            console.log(data)
                            toast.success('successfully deleted')
                            toggleLoading()
                            window.location.reload(true);
                        })
                        .catch(e =>{
                            toast.error('something wrong')
                            toggleLoading()
                        })
                }else{
                    toast.error('unauthorized please login again')
                    toggleLoading()
                }



            }
        })
    }

    if(isLoading) return  <ScreenLoader></ScreenLoader>
    return (
        <div className="overflow-x-auto ">
            <h1 className={'bg-dark text-center text-white text-4xl font-bold'}>Product List</h1>
            <table className="table  w-full my-5 ">
                <thead className=''>
                <tr className='text-center'>
                    <th></th>
                    <th>PRODUCT NAME</th>
                    <th> PHOTO </th>
                    <th>QUANTITY</th>
                    <th>TOTAL PRICE</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((product,index)=>{
                        return (
                            <tr className={'text-center'}>
                                <td>{index+1}</td>
                                <td>{product.name}</td>
                                <td className={'flex justify-center '}> <img className={'w-14 h-14'} src={product.photoUrl} /> </td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td className=''>
                                    <button onClick={()=>deleteAlert(product._id)} className='btn bg-red-900 py-1 mr-2'>delete</button>
                                    <button onClick={()=>navigate(`/dashboard/admin/${product.slug}`)} className='btn btn-secondary py-1'>edit</button>
                                </td>
                            </tr>
                        )
                    })

                }

                </tbody>

            </table>
        </div>
    );
};

export default ProductList;