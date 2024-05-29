import React from "react";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrashCan, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";

function Cart() {
  const {
    items,
    removeFromCart,
    emptyCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    handleCheckout,
  } = useCart();

  return (
    <div>
      <h1 className="mt-3 text-center mb-3">Checkout </h1>

      {items.length < 1 && (
        <p className="mt-5 text-center fs-5">
          {" "}
          You have not any items in your cart.
        </p>
      )}
      {items.length > 0 && (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div className="container">
                  <div className="row mt-5 justify-content-center align-items-center">
                    <div className="col-md-3 col-sm-4 col-4">
                      <Link to={`/product/${item.id}`}>
                        <img
                          className="buy-img  mx-2"
                          src={item.image?.url}
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="col-md-3 col-sm-4 col-2 mx-5">
                      <Link to={`/product/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                    </div>
                    <div className="col-md-3 col-sm-1 col-2">
                      <Link onClick={() => removeFromCart(item)}>
                        <FaTrashCan />
                      </Link>
                    </div>
                  </div>

                  <div className="row mt-5 justify-content-around align-items-center mb-5 dsc-price">
                    <div className="col-md-3 col-sm-4 col-5 ps-4 quantity">
                      <Link
                        onClick={() => decreaseQuantity(item)}
                        className="mx-3 fs-2"
                      >
                        <FaCircleMinus />
                      </Link>
                      <span className="fs-4"> {item.quantity}</span>

                      <Link
                        onClick={() => increaseQuantity(item)}
                        className="ms-3 fs-2"
                      >
                        <FaCirclePlus />
                      </Link>
                    </div>
                    <div className="col-md-6 col-sm-7 col-6 fs-3 ">
                      {item.discountedPrice !== item.price ? (
                        <>
                          <span
                            className="me-5 dis-price"
                            style={{
                              textDecoration: "line-through",
                            }}
                          >
                            {item.price},
                          </span>
                          <span className="dis-price1">
                            {item.discountedPrice} $
                          </span>
                        </>
                      ) : (
                        <span className="dis-price mx-5"> {item.price} $</span>
                      )}
                    </div>
                  </div>
                </div>
                <hr className="checkout-line" />
              </li>
            ))}
          </ul>

          <div className="container mt-5 px-5">
            <div className="row justify-content-center ">
              <h2 className="col-md-5 col-sm-6 col-6 total-price">
                Total Price:
              </h2>
              <h2 className="col-md-5 col-sm-6 col-6 total-price">
                {getTotalPrice().toFixed(2)} $
              </h2>
            </div>

            <div className="row  align-items-center ">
              <div className="mb-5 mt-5">
                <button
                  className=" btn btn-primary "
                  onClick={() => emptyCart(items)}
                >
                  Clear Cart
                </button>

                <Link to="/checkout" className="mt-5 mb-5 ms-4">
                  <button
                    className="btn  btn-primary "
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
