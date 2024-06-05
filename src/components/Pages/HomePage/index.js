import React from "react";
import useApi from "../../../hooks/apiFetch";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useState } from "react";

function Home() {
  const { addToCart, items, discountPercentage, Star } = useCart();
  const { data, isLoading, isError } = useApi(
    "https://v2.api.noroff.dev/online-shop"
  );
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  const findCartItem = items.find((basket_item) => basket_item.id === items.id);

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <main>
      <form
        className="d-flex justify-content-center align-items-center my-3 search-form"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <h1 className="text-center mt-3 mb-4">Products</h1>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 pb-4  ">
        {filteredProducts.map((product) => (
          <div className="col mb-4" key={product.id}>
            <div className="card m-auto">
              <h3 className="card-title text-center">{product.title}</h3>
              {product.discountedPrice !== product.price ? (
                <span className="cart-percentage cart-discount">
                  {discountPercentage(product)}%
                </span>
              ) : (
                <span></span>
              )}
              <img
                className="card-img-top cart-img"
                src={product.image.url}
                alt={product.name}
              />

              <div className="card-body text-center">
                <div
                  style={{
                    fontSize: "2rem",
                    color: "gold",
                  }}
                >
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} filled={index < product.rating} />
                  ))}
                </div>
                <div className="d-flex justify-content-around mb-3">
                  {product.discountedPrice !== product.price ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through red",
                          color: "red",
                        }}
                      >
                        {product.discountedPrice} $
                      </span>
                      {product.price} $
                    </>
                  ) : (
                    `${product.price} $`
                  )}
                </div>
                <div className="d-flex  justify-content-around">
                  <div>
                    <button
                      onClick={() => addToCart(product, findCartItem)}
                      className="btn  btn-primary "
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <button className="btn  btn-primary ms-1">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
