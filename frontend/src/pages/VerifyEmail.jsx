// VerifyEmail.js
import React, { useEffect, useState } from "react";
import { Link, json, useLocation, useParams } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../config";

const VerifyEmail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token"); // Extract the token from the URL

  console.log(token);

  const [verificationStatus, setVerificationStatus] = useState(null);
  
  useEffect(() => {
    // Send a request to your backend to verify the email using Axios
  //   fetch(`http://localhost:5000/hi?token=${token}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setVerificationStatus(data.message);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setVerificationStatus("An error occurred during verification.");
  //     });
  // }, [token]);

  fetch(`http://localhost:5000/hi?token=${token}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    setVerificationStatus(data.message);
  })
  .catch((error) => {
    console.error(error);
    setVerificationStatus("An error occurred during verification.");
  });

})

return (
  <div className="bg-gray-100 h-screen">
    <div className="bg-white p-6  md:mx-auto">
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-16 h-16 mx-auto my-6"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Email Verification
        </h3>
        <p className="text-gray-600 my-2">
          {verificationStatus}
        </p>
        <div className="py-10 text-center">
          <Link
            to="/login"
            className="px-12 bg-buttonBgColor text-white font-semibold py-3"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default VerifyEmail;
