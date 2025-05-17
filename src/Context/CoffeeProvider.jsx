import React, { createContext, useEffect, useState } from 'react';

export const CoffeeContext = createContext();

const CoffeeProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [coffees, setCoffees] = useState(null);

    useEffect(() => {
       const fetchData = async() => {
            try{
                const res = await fetch('http://localhost:3000/coffees');
                if(!res.ok) {
                    throw new error(`Fetch failed: ${response.status} - ${error.text}`)
                }
                const data = await res.json();
                setCoffees(data)
            }finally{
                setLoading(false)
            }
       };

       fetchData()
    }, []);


    return (
        <CoffeeContext value={{coffees, setCoffees, loading}}>
            {children}
        </CoffeeContext>
    );
};

export default CoffeeProvider;