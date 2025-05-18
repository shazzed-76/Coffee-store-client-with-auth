import React, { use } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';
import Swal from 'sweetalert2';

const SignUp = () => {
    const { createUser } = use(AuthContext);


    const handleSignUpForm = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        // const email = formData.get('email');
        // const password = formData.get('password');
        const { email, password, ...remainingData } = Object.fromEntries(formData.entries());

        console.log(email, password, remainingData);

        //create a user in firebase
        createUser(email, password)
        .then(result => {
            const user = result.user;
            const userInfo = {
              ...remainingData,
              email,
              creationTime: user.metadata?.creationTime,
              lastSignInTime: user.metadata?.lastSignInTime,
            };

            //send user info in the database
            fetch("http://localhost:3000/users", {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(userInfo)
            })
            .then(res => res.json())
            .then(data => {
               if(data.insertedId){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });

                form.reset()
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
          <form
            onSubmit={handleSignUpForm}
            className="fieldset"
          >
            {/* user name */}
            <label className="label">Name</label>
            <input type="text" name='name' className="input w-full" placeholder="Name" />

            {/* user address */}
            <label className="label">Address</label>
            <input type="text" name='address' className="input w-full" placeholder="Address" />

             {/* photo url */}
            <label className="label">Photo URL</label>
            <input type="text" name='photoUrl' className="input w-full" placeholder="Photo URL" />

            {/* user email */}
            <label className="label">Email</label>
            <input type="email" name='email' className="input w-full" placeholder="Email" />

            {/* user password */}
            <label className="label">Password</label>
            <input type="password" name='password' className="input w-full" placeholder="Password" />           
            <button
              type='submit'
             className="btn bg-[#d2b48c] text-white mt-4"
            >
              Sign Up              
            </button>
          </form>
        </div>
      </section>
    );
};

export default SignUp;