import React from 'react';
import CoffeesContainer from './CoffeesContainer';
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate();

  
    return (
      <div>
        <div className='max-w-sm mx-auto pt-10 flex gap-5'>
          <button className="mx-auto btn" onClick={() => navigate("/users")}>
            Users
          </button>
          <button className="mx-auto btn" onClick={() => navigate("/signIn")}>
            Sign In
          </button>
          <button className="mx-auto btn" onClick={() => navigate("/SignUp-user")}>
            Sign Up
          </button>
        </div>
        <CoffeesContainer />
      </div>
    );
};

export default Home;