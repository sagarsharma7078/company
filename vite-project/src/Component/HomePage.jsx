import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
  <div className="flex h-screen w-screen">
  <div className="flex-1 bg-gradient-to-br from-[#0D3626] to-[#0D1A26] flex flex-col justify-center items-center text-white">
    <div className="mb-4">
      <p>Start Project with Sagar Sharma</p>
    </div>
    <div>
      <Link to="/RegistrationForm" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Start
      </Link>
    </div>
  </div>
  <div className="flex-1 bg-gray-800 flex justify-center items-center">
   <img src="https://img.freepik.com/free-vector/isometric-business-people-meeting_23-2148292914.jpg?t=st=1728762448~exp=1728766048~hmac=163c61cc469e5a0d2131043d23875da6578ad45da5bc337166da4b61a445577e&w=740" alt="" />
  </div>
</div>




    </>
  );
}
