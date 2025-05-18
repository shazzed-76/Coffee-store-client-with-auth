import React, { use } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { CoffeeContext } from "../Context/CoffeeProvider";

const CoffeeCard = ({ coffee }) => {
  const navigate = useNavigate();
  const { coffees, setCoffees } = use(CoffeeContext);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/coffees/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              const newCoffees = coffees.filter((coffee) => coffee._id !== id);
              setCoffees(newCoffees);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="flex items-center bg-[#f4f5f1] p-5 rounded-md">
      {/* coffee img */}
      <div className="w-40 h-52 p-2 bg-transparent flex justify-center">
        <img className="object-contain" src={coffee.photoUrl} alt="" />
      </div>
      {/* text content */}
      <div className="text-sm font-semibold text-left flex-1">
        <h2>Name: {coffee?.coffeeName}</h2>
        <h2>Category: {coffee?.category}</h2>
        <h2>Price: {coffee?.price}</h2>
      </div>
      {/* action btn */}
      <div className="join join-vertical space-y-5 *:rounded">
        <button
          onClick={() => navigate(`/single-coffee/${coffee?._id}`)}
          className="btn join-item"
        >
          <IoEyeOutline size={20} />
        </button>
        <Link
          to={`/update-coffee-info/${coffee._id}`}
          className="btn join-item"
        >
          <MdEdit size={20} />
        </Link>
        <button
          onClick={() => handleDelete(coffee?._id)}
          className="btn join-item"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default CoffeeCard;
