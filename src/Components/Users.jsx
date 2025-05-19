import { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Firebase/AuthProvider';

const Users = () => {
    const initialUsers = useLoaderData();
    const { deleteUserData } = use(AuthContext)
    const [ users, setUsers ] = useState(initialUsers);


   const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingUsers = users.filter((user) => user._id !== id);

        setUsers(remainingUsers);
        //delete the user from database
        fetch(`https://coffee-store-server-with-auth-sooty.vercel.app/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                //delete the user from firebase
                deleteUserData()
                .then(() => {                   
                    Swal.fire({
                      title: "Deleted!",
                      text: "User data has been deleted.",
                      icon: "success",
                    });
                })
                .catch(error => {
                    console.log(error)
                })
            }
        });
      }
    });
   } 
    return (
      <section className="min-h-screen px-5 md:px-10 max-w-7xl mx-auto py-10">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr key={user?._id}>
                            <td>{users.indexOf(user) + 1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.address}</td>
                            <td><button
                                onClick={() => handleDeleteUser(user?._id)}
                                className='btn h-auto'
                            >
                                Delete
                            </button></td>
                        </tr>
                    ))
                }
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default Users;