import { Stack, Input, Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import httpRequest from "../Services/http-request";
import { CartContext } from "../Services/Context/Context";
import Cookies from 'js-cookie'

export default function FinalizeCartPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(""); 
  
  const [loading, setLoading] = useState(false);
  const { cartItems,setCartItems,setCartData } = useContext(CartContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!firstName || !lastName || !address || !mobile || !selectedDate) {
//       alert("Please fill in all fields.");
//       return;
//     }

    
//     const orderData = {
//       firstName,
//       lastName,
//       address,
//       mobile,
//       deliveryDate: selectedDate,
//     };

//     try {
//       setLoading(true);
      
//       const response = await httpRequest.post("/api/orders", orderData);
//       if (response.status === 201) {
//         alert("Order submitted successfully!");
        
//       }
//     } catch (error) {
//       console.error("Error submitting order", error);
//       alert("Failed to submit order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };



const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
    
    const userId = Cookies.get('userId'); 
    const products = cartItems.map(item => ({
      product: item.id, 
      count: item.count,
    }));
    console.log(products);
    console.log("User ID: ", userId);
    console.log("Products: ", products);

    const orderData = {
      user: userId,
      products,
      deliveryStatus: false, 
      deliveryDate, 
    //   address, 
    //   firstName, 
    //   lastName,  
    //   mobile, 
    };

    
    httpRequest.post('/api/orders', orderData)
      .then(response => {
        console.log('Order submitted successfully:', response.data);
        setCartData([]);
        setCartItems([]);
        // localStorage.removeItem("cart");
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="flex justify-center items-start flex-col h-screen mx-20 gap-5">
      <p className="font-semibold text-3xl">Finalize your cart</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-start gap-5 bg-sky-950 text-white p-10 w-full rounded-3xl h-2/3"
      >
        <Stack spacing={5}>
          <Input
            placeholder="First name : "
            size="lg"
            variant="flushed"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last name : "
            size="lg"
            variant="flushed"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Address : "
            size="lg"
            variant="flushed"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="Mobile number : "
            size="lg"
            variant="flushed"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          
         
          <DatePicker
            selected={deliveryDate}
            onChange={(date) => setDeliveryDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select delivery date"
            className="p-2 rounded-md bg-white text-black w-full"
            minDate={tomorrow.setDate(tomorrow.getDate() + 1)} // تنظیم حداقل تاریخ برای فردا
    
          />
        </Stack>

        <Button
          colorScheme="teal"
          size="md"
          className="p-6"
          type="submit"
          isLoading={loading}
        >
          Payment
        </Button>
      </form>
    </div>
  );
}
