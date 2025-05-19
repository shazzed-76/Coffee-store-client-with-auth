import React, { createContext, useEffect, useState } from 'react';

export const CoffeeContext = createContext();

const CoffeeProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [coffees, setCoffees] = useState(null);
    const [ status, setStatus ] = useState(true);


    useEffect(() => {
       const fetchData = async() => {
            try{
                const res = await fetch('https://coffee-store-server-with-auth-sooty.vercel.app/coffees');
                if(!res.ok) {
                    throw new error(`Fetch failed: ${res.status}`)
                }
                const data = await res.json();
                setCoffees(data)
            }finally{
                setLoading(false)
            }
       };

       fetchData()
    }, [status]);


    return (
      <CoffeeContext value={{ coffees, setCoffees, loading, setStatus, status }}>
        {children}
      </CoffeeContext>
    );
};

export default CoffeeProvider;