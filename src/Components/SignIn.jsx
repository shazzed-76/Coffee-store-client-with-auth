import React, { use } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';

const SignIn = () => {
    const { signInUser } = use(AuthContext)

    const handleSignInForm = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        //log in a user with firebase
        signInUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
           const signedInUserData = {
                email,
                lastSignInTime: user?.metadata?.lastSignInTime
           }
        //    console.log(lastSignInTime)
           //update the data in batabase
           fetch(`https://coffee-store-server-with-auth-sooty.vercel.app/users`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(signedInUserData)
           })
           .then(res => res.json())
           .then(data => {
                if(data.modifiedCount){
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Signed up successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
           })

        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
      <section className="min-h-screen grid items-center">
        <div className="max-w-sm mx-auto shadow-md w-full h-fit p-5 bg-[#f4f3f0]  rounded-md">
          <form onSubmit={handleSignInForm}  className="fieldset">          
           
            {/* user email */}
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
            />
            {/* user password */}
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input w-full"
              placeholder="Password"
            />
            <button type="submit" className="btn bg-[#d2b48c] text-white mt-4">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    );
};

export default SignIn;