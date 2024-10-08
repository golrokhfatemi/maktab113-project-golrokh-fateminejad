import { createContext, useEffect, useState } from "react";

// ایجاد Context برای مدیریت سبد خرید
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  }, [cartData]);

 
  const addToCart = (item) => {
    const existingProduct = cartData.find((product) => product.id === item._id);
    console.log("press add to cart");

    if (existingProduct) {
      
      const updatedCart = cartData.map((product) =>
        product.id === item._id
          ? { ...product, count: product.count + 1 }
          : product
      );
      setCartData(updatedCart);
    } else {
      
      const updatedCart = [
        ...cartData,
        {
          id: item._id,
          name: item.name,
          count: 1,
          thumbnail: item.thumbnail,
          price: item.price,
        }, 
      ];
      setCartData(updatedCart);

    }
  };

  return (
    <CartContext.Provider value={{ cartData, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
