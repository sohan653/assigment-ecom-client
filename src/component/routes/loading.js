import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScreenLoader from "../ScreenLoader";

const Loading = ({ path = "login" }) => {
    // state
    const [count, setCount] = useState(3);
    // hooks
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 &&
        navigate(`/${path}`, {
            state: location.pathname,
        });
        // cleanup
        return () => clearInterval(interval);
    }, [count]);
    return (
        <ScreenLoader></ScreenLoader>
    );
};

export default Loading;