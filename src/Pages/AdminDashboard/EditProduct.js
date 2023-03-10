import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useLoading} from "../../hooks/loading";
import {toast} from "react-toastify";
import {useAuth} from "../../hooks/auth";
import ScreenLoader from "../../component/ScreenLoader";

const EditProduct = () => {
    const [auth,setAuth]=useAuth()

    const [isLoading,toggleLoading]=useLoading()
    const [product,setProduct]=useState({})
    const {slug}=useParams();

    // product state
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    useEffect(()=>{
        getData()
    },[])
    const getData=async ()=>{
            toggleLoading()
        const {data}=await axios.get(`/read-product/${slug}`)

        if(data.status==="success"){

            setProduct(data.data)
            toggleLoading()
        }
    }

    const handleSubmit=async (e) =>{
            e.preventDefault();
        try {

            const productData = new FormData();

            productData.append("name", name || product.name);
            productData.append("description", description || product.description);
            productData.append("price", price || product.price);
            productData.append("quantity", quantity || product.quantity);
    console.log(price)
            if(auth?.token){
                toggleLoading()
                const data = await axios.post(`/update-product/${product._id}`, productData);
                console.log(data)
                if (!data) {
                    toggleLoading()
                    toast.error("failed to create");
                } else {
                    toggleLoading()
                    toast.success(`product is created`);
                    // window.location.reload(true)
                }
            }

        } catch (err) {
            toggleLoading()
            console.log(err);
            toast.error("Product create failed. Try again.");
        }
    }
    const updatePhoto=async (e)=>{
        e.preventDefault()

        if(!photo){
            toast.error('upload new photo');


        }else{
                const photoData= new FormData();
                photoData.append("photo", photo)
            if(auth?.token){
                toggleLoading()
                const url=`/photo-update/${product._id}/${product.photoId}`;
              const data=await axios.post(url,photoData)


                if(data){
                    toggleLoading()
                    toast.success("photo update successfully");
                    window.location.reload(true)
                }else{

                    toast.error("failed to update")
                    toggleLoading()
                }
            }else{
                toast.success('unauthorized please again login')
            }

        }
    }
    if(isLoading){
        return <ScreenLoader></ScreenLoader>
    }
    return (
        <div className={'grid grid-cols-2'}>
            <div className={'w-full flex flex-col justify-center items-center'}>
                <h1 className={'text-4xl text-info'}>Update Product</h1>
                <form className={'w-full ml-8'}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="input input-bordered input-info w-full max-w-xs"
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            defaultValue={product.name}
                            onChange={e=> setName(e.target.value)}

                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            className="input input-bordered input-info w-full max-w-xs"
                            id="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            defaultValue={product.quantity}
                            onChange={e=> setQuantity(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className=" input input-bordered input-info w-full max-w-xs"
                            id="price"
                            type="number"
                            placeholder="Enter price"
                            defaultValue={product.price}
                            onChange={e=> setPrice(e.target.value)}

                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className=" textarea textarea-info textarea-lg w-full max-w-xs"
                            id="price"
                            type="number"
                            placeholder="Enter Description"
                            defaultValue={product.description}
                            onChange={e=> setDescription(e.target.value)}

                        />
                    </div>
                    <input
                        onClick={handleSubmit}
                        className="btn btn-info"
                        type="submit"
                        value={'Update'}
                    />


                </form>
            </div>

            <div className={'flex flex-col justify-center items-center'}>
                <div className="mb-4">
                    {photo ? (
                        <div className="text-center">
                            <h1 className={'text-center text-2xl font-bold py-3'}>New Chosen Photo</h1>
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product photo"
                                className="mb-2 rounded "
                                width="300px"
                                height="300px"
                            />

                        </div>) :  <div>  <h1 className={'text-center text-2xl font-bold py-3'}>Photo From Product</h1>   <img className={'w-[300px] h-[300px] rounded'} src={product.photoUrl}/></div> }

                    <label className="block text-white-700 font-bold mb-2" htmlFor="photo">

                    </label>
                    <input
                        className="file-input file-input-info w-full max-w-xs"
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={e => setPhoto(e.target.files[0])}
                        required

                    />
                </div>


                <button onClick={updatePhoto} className={'btn btn-info'}>Update photo</button>
            </div>
        </div>
    );
};

export default EditProduct;