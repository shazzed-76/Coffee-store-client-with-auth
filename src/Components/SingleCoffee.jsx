import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const SingleCoffee = () => {
    const coffee = useLoaderData();
    console.log(coffee)
    return (
      <section className="max-w-7xl px-5 md:px-10  mx-auto min-h-screen grid items-center">
        <div className="hero max-w-3xl h-fit mx-auto bg-[#f4f5f1] rounded-md">
          <div className="hero-content w-full flex-col lg:flex-row lg:justify-between">
            <img src={coffee?.photoUrl} className="max-w-sm rounded-lg" />
            <div className='flex-1'>
              <h1 className="text-5xl font-bold">{coffee?.coffeeName}</h1>
              <p className="pt-6">{coffee?.datails}</p>
              <p>
                <span className="font-bold">Price:</span> {coffee?.price}tk
              </p>
              <p>
                <span className="font-bold">Category:</span> {coffee?.category}
                tk
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default SingleCoffee;