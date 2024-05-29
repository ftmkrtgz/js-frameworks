import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../../../context/CartContext";

function Navbar() {
  const { getTotalItems } = useCart();
  return (
    <nav className="navbar bg-light-subtle bg-body-secondary">
      <div className="container-fluid container-nav">
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img className="logo-img" src="../logo.png" alt="Logo" />
          </Link>
        </div>
        <div className=" right">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaCartPlus />
                <span className="cart-quantity">{getTotalItems()}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
