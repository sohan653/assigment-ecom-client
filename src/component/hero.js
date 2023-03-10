import React from 'react';
import {useAuth} from "../hooks/auth";
import {Link} from "react-router-dom";
const imageLink='https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-5g-smart-phone-technology-banner-image_17947.jpg'
const Hero = () => {
    const [auth,setAuth]=useAuth()
    const name=auth?.user?.firstName;

    return (
        <div>
            <div className="hero h-[70vh]" style={{ backgroundImage: `url(${imageLink})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl capitalize font-bold">{`Hello ${name ? name : "user"}`}</h1>
                        <p className="mb-5">Discover the Future at Our Tech Shop.</p>
                        <button ><Link className="btn btn-primary" to={'/shop'}>Shop Now</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;