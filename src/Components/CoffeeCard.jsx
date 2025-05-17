import React from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

const CoffeeCard = ({coffee}) => {
    return (
      <div className="flex items-center justify-between bg-[#f4f5f1] p-5 rounded-md">
        {/* coffee img */}
        <div className="w-40 h-52 p-2 bg-transparent flex justify-center">
          <img className="object-contain" src={coffee.photoUrl} alt="" />
        </div>
        {/* text content */}
        <div></div>
        {/* action btn */}
        <div className="join join-vertical space-y-5 *:rounded">
          <button className="btn join-item">
            <IoEyeOutline size={20} />
          </button>
          <button className="btn join-item">
            <MdEdit size={20} />
          </button>
          <button className="btn join-item">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    );
};

export default CoffeeCard;