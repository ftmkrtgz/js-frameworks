import React from "react";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

function CheckoutSuccess() {
  return (
    <div className="text-center mx-auto mt-5">
      <div className="fs-1 text-success">
        <FaCircleCheck />
      </div>
      <h1 className="text-danger">Success !</h1>
      <p>Your purchase has been made successfully.</p>
      <Link to="/">
        <button className="btn  btn-primary">
          <FaChevronLeft />
          {"   "}
          Continue shopping
        </button>
      </Link>
    </div>
  );
}

export default CheckoutSuccess;
