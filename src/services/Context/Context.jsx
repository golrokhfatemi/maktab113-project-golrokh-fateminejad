import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();

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

  useEffect(() => {
    setCartItems(cartData); // به‌روزرسانی cartItems هر بار که cartData تغییر کند
  }, [cartData]);

  const addToCart = (item) => {
    const existingProduct = cartData.find((product) => product.id === item._id);
    console.log("press add to cart");

    if (existingProduct) {
      
      const updatedCart = cartData.map((product) =>
        product.id === item._id
          ? { ...product, count: product.count + item.count  }
          : product
      );
      setCartData(updatedCart);
      setCartItems(updatedCart);

      toast({
        title: "Quantity Updated",
        description: `${item.name} quantity updated in the cart.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      
      const updatedCart = [
        ...cartData,
        {
          id: item._id,
          name: item.name,
          count: item.count ,
          thumbnail: item.thumbnail,
          price: item.price,
        }, 
      ];
      setCartData(updatedCart);
      setCartItems(updatedCart);

      toast({
        title: "Added to Cart",
        description: `${item.name} has been added to your cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    }
  };



  return (
    <CartContext.Provider value={{ cartData, addToCart,cartItems,setCartData,setCartItems}}>
      {children}
    </CartContext.Provider>
  );
};
