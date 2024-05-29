import React from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/apiFetch";

import { useCart } from "../../../context/CartContext";

function Product() {
  let { id } = useParams();
  const { addToCart, items, discountPercentage, Star } = useCart();
  const { data, isLoading, isError } = useApi(
    `https://v2.api.noroff.dev/online-shop/${id}`
  );

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const findCartItem = items.find((item) => item.id === id);

  return (
    <>
      <div className="card mb-3 mx-auto mt-5" style={{ maxWidth: "740px" }}>
        <div className="row g-0">
          <div className="col-md-5">
            <span className="cart-percentage-single cart-discount">
              {discountPercentage(data)} %
            </span>
            <img
              className="single-img "
              src={data.image?.url}
              alt={data.name}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="text-center">{data.title}</h3>
              <div
                style={{
                  fontSize: "2rem",
                  color: "gold",
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <Star key={index} filled={index < data.rating} />
                ))}
              </div>
              <p className="card-text">{data.description}</p>
              <div className="d-flex justify-content-around mb-3 mx-4 fs-5">
                {data.discountedPrice !== data.price ? (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through red",
                        color: "red",
                      }}
                    >
                      {data.discountedPrice} $
                    </span>
                    {data.price} $
                  </>
                ) : (
                  `${data.price} $`
                )}
              </div>
              <div className="mx-4">
                <button
                  onClick={() => addToCart(data, findCartItem)}
                  className="btn  btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="line" />
        <h3 className="mt-4 mx-5">Reviews:</h3>
        {data.reviews?.length > 0 ? (
          <div className="mx-5">
            <ul>
              {data.reviews.map((review) => (
                <li key={review.id}>
                  <p>
                    <strong>{review.username}</strong> {"      "}
                    <span
                      style={{
                        fontSize: "2rem",
                        color: "gold",
                      }}
                    >
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} filled={index < data.rating} />
                      ))}
                    </span>
                  </p>
                  <p>{review.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center mt-5">There are no reviews yet. </p>
        )}
      </div>
    </>
  );
}

export default Product;
