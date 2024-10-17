

// import { useEffect, useState } from "react";
// import httpRequest from "../Services/http-request";


// const Cart = ({ productsInCart }) => {
//   const [cartDetails, setCartDetails] = useState([]);

//   useEffect(() => {
//     
//     if (productsInCart.length > 0) {
//       
//       const fetchCartDetails = async () => {
//         try {
//           const productIds = productsInCart.map(item => item.id);
//           const response = await httpRequest.post("/api/cart/products", {
//             productIds,
//           });
          
//         
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
    Button,
    Box,
    Flex,
    Text,
    IconButton,
    Toast,
    useToast,
  } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Services/Context/Context";
import { useNavigate} from "react-router-dom";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
  
  const Cart = ({ isOpen, onClose}) => {
    const [cartItems, setCartItems] = useState([]);
    const {cartData , setCartData} = useContext(CartContext)
    const navigate = useNavigate()
    const toast = useToast();

    useEffect(() => {
        if (cartData && cartData.length > 0) {
          setCartItems(cartData);
        }
      }, [cartData]);



  
   const updateProductQuantity = (id, x) => {
    // console.log(cartData);
    
    const updatedCart = cartData
    
      .map((item) => {
        if (item.id === id) {
          const newCount = item.count + x;
          
          // Avoid increasing the number of warehouse inventory
          if (newCount > item.quantity) {
            toast({
              title: "Not enough in stock",
              
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
            return item; 
          }
  
          return { ...item, count: Math.max(1, newCount) }; 
        }
        return item;
      })
      .filter((item) => item.count > 0); 
  
    setCartItems(updatedCart);
    setCartData(updatedCart); 
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  };
  

 
  const removeProductFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id); 
    setCartItems(updatedCart); 
    setCartData(updatedCart); 
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 

    toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  };

  const handleFinalizeCart = () => {
    onClose(); 
    navigate('/finalcartconfirm'); 
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.count, 0);

    return (
      <Modal isOpen={isOpen} onClose={onClose} >
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
                  
                  <Flex alignItems="center">
                    <Text mr={2}>Quantity:</Text>
                    <IconButton
                      icon={<MinusIcon />}
                      onClick={() => updateProductQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                      size="sm"
                      isDisabled={item.count === 1}
                    />
                    <Text mx={2}>{item.count}</Text>
                    <IconButton
                      icon={<AddIcon />}
                      onClick={() => updateProductQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                      size="sm"
                    />
                  </Flex>
                  {/* <p>quantuty: {item.count}</p> */}
                  <p>price:   {item.price * item.count}  $</p>
                </div>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => removeProductFromCart(item.id)}
                  aria-label="Remove product"
                  size="sm"
                  colorScheme="red"
                />
              </div>
            ))
            
          )}
          <Box className=" flex justify-between">
          <Box className="flex justify-center items-center">Total Price: {totalPrice.toFixed(2)} $</Box>
          <Button colorScheme="teal" onClick={handleFinalizeCart}> Finalize The Cart </Button>
          </Box>
          
        </ModalBody>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default Cart;
  
