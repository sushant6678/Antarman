// VerifyEmail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyId = () => {

    const {id} = useParams();

  return (
    <div>
      <h1>Id Verification</h1>
      <p>{id}</p>
    </div>
  );
};

export default VerifyId;
