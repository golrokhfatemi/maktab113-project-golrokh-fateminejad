

// import { useEffect, useState } from "react";
// import httpRequest from "../Services/http-request";


// const Cart = ({ productsInCart }) => {
//   const [cartDetails, setCartDetails] = useState([]);

//   useEffect(() => {
//     // اگر محصولات در سبد خرید وجود دارند
//     if (productsInCart.length > 0) {
//       // برای هر محصول در سبد خرید، جزئیات را از backend دریافت کنید
//       const fetchCartDetails = async () => {
//         try {
//           const productIds = productsInCart.map(item => item.id);
//           const response = await httpRequest.post("/api/cart/products", {
//             productIds,
//           });
          
//           // تنظیم جزئیات محصولات
//           setCartDetails(response.data.products);
//         } catch (error) {
//           console.error("Error fetching cart details", error);
//         }
//       };

//       fetchCartDetails();
//     }
//   }, [productsInCart]);

//   return (
//     <div>
//         <p>Cart</p>
//       {cartDetails.length > 0 ? (
//         cartDetails.map((item) => (
//           <div key={item._id}>
//             <p>Name: {item.name}</p>
//             <p>Price: ${item.price}</p>
//             <p>Quantity: {productsInCart.find(p => p.id === item._id)?.count || 0}</p>
//           </div>
//         ))
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default Cart;


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
  } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Services/Context/Context";
  
  const Cart = ({ isOpen, onClose}) => {
    const [cartItems, setCartItems] = useState([]);
    const {cartData , setCartData} = useContext(CartContext)

//       // برای همگام‌سازی هر بار که cartData تغییر کرد
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);
//   }, [cartData]);

useEffect(() => {
    
    const handleStorageChange = () => {
        // Fetch cart data from localStorage when the component mounts
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      setCartItems(storedCart);
    //   setCartData(storedCart);
    };
  
    // فراخوانی یک بار هنگام mount شدن کامپوننت
    handleStorageChange();
  
    // رویداد 'storage' برای شنیدن تغییرات در localStorage
    window.addEventListener("storage", handleStorageChange);
  
    // پاکسازی رویداد هنگام unmount شدن کامپوننت
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setCartData]);

  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Shopping Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <ModalBody>
          {cartData.length === 0 ? (
            <p> Cart is empty</p>
          ) : (
            cartData.map((item) => (
              <div key={item.id} className="flex flex-row gap-5 border border-zinc-500 rounded-xl p-4 m-3">
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                  
                  boxSize="50px"
                  objectFit="cover"
                  marginRight="15px"
                />
                <div>
                  <p>{item.name}</p>
                  <p>quantuty: {item.count}</p>
                  <p>price: {item.price} $</p>
                </div>
              </div>
            ))
          )}
        </ModalBody>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default Cart;
  
