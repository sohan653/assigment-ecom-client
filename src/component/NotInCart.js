import React from 'react';
import {Link} from "react-router-dom";

const NotInCart = () => {
    return (
        <div className={'min-h-screen w-full flex flex-col justify-center items-center'}>
            <h1 className={'text-red-900 text-3xl py-5'}>You have not added cart</h1>
            <button> <Link className={'btn btn-primary'} to={'/shop'}>GO to Shop Page and Add to Cart</Link> </button>

        </div>
    );
};

export default NotInCart;