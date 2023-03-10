import React, {useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import {useLoading} from "../../hooks/loading";
import ScreenLoader from "../../component/ScreenLoader";

const CreateProduct = () => {
    const [isLoading,toggleLoading]=useLoading()
    const [auth,setAuth]=useAuth()
    const navigate = useNavigate();

    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toggleLoading()
            const productData = new FormData();
            productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);

            productData.append("quantity", quantity);

            if(auth?.token){
                const { data } = await axios.post("/create-product", productData);
                if (data?.status !== "success") {
                    toggleLoading()
                    toast.error("failed to create");
                } else {
                    toggleLoading()
                    toast.success(`"${data.data.name}" is created`);
                    navigate("/dashboard/admin");
                }
            }

        } catch (err) {
            toggleLoading()
            console.log(err);
            toast.error("Product create failed. Try again.");
        }
    };

    if(isLoading){
        return <ScreenLoader></ScreenLoader>
    }
    return (
        <div className={'grid grid-cols-2'}>
            <div className={'flex flex-col justify-center items-center'}>
                <h1 className={'text-4xl text-info'}>Create Product</h1>
                <form className={''}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="input input-bordered input-info w-full max-w-xs"
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            onChange={e=> setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="photo">
                            Photo
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
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            className="input input-bordered input-info w-full max-w-xs"
                            id="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            onChange={e=> setQuantity(e.target.value)}
                            required
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
                            onChange={e=> setPrice(e.target.value)}
                            required
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
                            onChange={e=> setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <input
                        onClick={handleSubmit}
                        className="btn btn-info"
                        type="submit"
                        value={'Create'}
                    />


                </form>
            </div>
            <div className={'flex flex-col justify-center items-center'}>
                <h1 className={'text-4xl py-4'}> {photo ?  photo.name : "Upload a photo"} </h1>
                {photo && (
                    <div className="text-center">
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="product photo"
                            className=""
                            width="300px"
                            height="300px"
                        />
                    </div>)}
            </div>
        </div>
    );
};

export default CreateProduct;