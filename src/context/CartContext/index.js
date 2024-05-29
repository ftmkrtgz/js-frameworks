import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const defaultCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(defaultCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    const existingProductIndex = items.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const newCartItems = [...items];
      newCartItems[existingProductIndex].quantity += 1;
      setItems(newCartItems);
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setItems(items.filter((item) => item.id !== product.id));
  };

  const increaseQuantity = (product) => {
    const newCartItems = items.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(newCartItems);
  };

  const decreaseQuantity = (product) => {
    const existingProduct = items.find((item) => item.id === product.id);
    if (existingProduct.quantity === 1) {
      removeFromCart(product);
    } else {
      const newCartItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setItems(newCartItems);
    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.discountedPrice ? item.discountedPrice : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const discountPercentage = (item) => {
    return item.discountedPrice !== item.price
      ? ((1 - item.discountedPrice / item.price) * 100).toFixed(0)
      : null;
  };

  const handleCheckout = () => {
    setItems([]);
  };

  const Star = ({ filled }) => {
    return <span>{filled ? "★" : "☆"}</span>;
  };

  const emptyCart = () => setItems([]);
  const values = {
    items,
    setItems,
    addToCart,
    removeFromCart,
    emptyCart,
    decreaseQuantity,
    increaseQuantity,
    getTotalItems,
    getTotalPrice,
    discountPercentage,
    handleCheckout,
    Star,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
