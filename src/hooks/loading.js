import React, {useContext, useState} from 'react';

 const LoadingContext = React.createContext();

 const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoading = () => {
        setIsLoading(prevLoading => !prevLoading);
    };

    return (
        <LoadingContext.Provider value={[isLoading, toggleLoading ]}>
            {children}
        </LoadingContext.Provider>
    );
};

 const useLoading=()=>useContext(LoadingContext);

 export {useLoading,LoadingProvider}