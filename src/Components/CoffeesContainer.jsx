import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import SingleCoffee from './SingleCoffee';
import CoffeeCard from './CoffeeCard';
import { CoffeeContext } from '../Context/CoffeeProvider';


// const promise = fetch("https://coffee-store-server-with-auth-sooty.vercel.app/coffees").then((res) =>
//   res.json()
// );
const CoffeesContainer = () => {
    // const initialData = use(promise);
    // const [coffees, setCoffees] = useState(initialData);

    const { coffees, loading } = use(CoffeeContext);
      
    if(loading) {
        return <p>loading</p>
    }
    return (
      <section className="max-w-7xl mx-auto  px-5 md:px-10 py-20 text-center">
        <h1 className="text-4xl lg:5xl font-semibold text-center mb-4">
          Our Popular Products
        </h1>
        <Link to="/add-coffee" className="btn">
          Add Coffee
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee?._id}              
              coffee={coffee}
            />
          ))}
        </div>
      </section>
    );
};

export default CoffeesContainer;