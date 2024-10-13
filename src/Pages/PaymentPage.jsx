

import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Services/Context/Context";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { setCartItems, setCartData } = useContext(CartContext);

  // Handles payment submission
  const handlePayment = () => {
    // Payment logic here
    console.log("Payment confirmed");
    // Clear the cart after successful payment
    setCartItems([]);  // Clear cart items in context
    setCartData([]);   // If you are managing extra data, clear it as well
    localStorage.removeItem("cart");  // Clear localStorage if you're using it for the cart
    navigate("/payment-success");  // You can redirect to success page
  };

  // Handles cancellation
  const handleCancel = () => {
    console.log("Payment cancelled");
    navigate("/");  // Redirect back to cart or another page
  };

  return   (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gray-200">
      {/* Image */}
      <img
        src="./images/payment.jpg"
        alt="Payment"
        className="w-full h-auto max-h-96 object-contain mb-10"
      />

      {/* Buttons */}
      <div className="flex justify-center gap-5">
        <Button colorScheme="red" size="lg" onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" size="lg" onClick={handlePayment}>
          Pay
        </Button>
      </div>
    </div>
  );
}

