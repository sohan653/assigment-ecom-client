import React from 'react';
import {useCart} from "../hooks/cart";
import {Link} from "react-router-dom";

const ProductCard = ({product}) => {
    const {addToCart}=useCart()
    const quantity=parseFloat(product.quantity)

    return (

            <div className="card w-96 min-h-min bg-secondary shadow-xl">
                <figure><img className={'object-cover p-3 h-48 w-54'} src={product.photoUrl} alt="Shoes" /></figure>
                <div className="card-body">
                    <p>{quantity >0 ? "in stock" :"out of stock"}</p>
                    <h2 className="card-title text-black">{product.name}</h2>
                    <p className={'text-3xl text-black'}>{product.price}$</p>
                    <div className="card-actions flex justify-between">
                        <button className="btn btn-info"> <Link to={`/product/${product.slug}`}>See Details</Link> </button>
                        <button onClick={()=>addToCart(product)} className="btn btn-danger">add to cart</button>
                    </div>

                </div>
            </div>

    );
};

export default ProductCard;