import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppRoute } from "./Routes/Routes.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "./Services/Context/Context.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
        <AppRoute />
        </CartProvider>
          
        
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
