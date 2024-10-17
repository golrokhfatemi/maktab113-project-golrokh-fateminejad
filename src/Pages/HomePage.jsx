//

import {
  Card,
  CardBody,
  Button,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useGetProducts } from "../Hook/useGetProducts";
import { useContext, useState } from "react";
import { Link, useLocation} from "react-router-dom";
import ProductCard from "../Components/Card";
import { CartContext } from "../Services/Context/Context";

export default function HomePage() {
  // const itemsPerPage = 4;
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCategory] = useOutletContext();
  const location = useLocation();
  const { data: productsData } = useGetProducts(
    { itemsPerPage:99}
  );
  
  const {addToCart} = useContext(CartContext)
  
  // const [cartData, setCartData] = useState(() => {
  //   return JSON.parse(localStorage.getItem("cart")) || [];
  // });

  const products = productsData?.data?.products || [];

   // Checking the URL and extracting the category parameter
   const queryParams = new URLSearchParams(location.search);
   const selectedCategoryId = queryParams.get("category");

   // Filter products by category in URL
  const categorizedProducts = products.reduce((acc, item) => {
    const category = item.category?._id;
    // console.log(category);
    if (selectedCategoryId && category !== selectedCategoryId) {
      return acc;
    }
    
    

    // Checking if the selected category matches the product category
    if (selectedCategoryId && category !== selectedCategoryId) {
      return acc;
    }

    const categoryName = item.category?.name || "Uncategorized";

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push(item);
    return acc;
  }, {});
  // console.log(categorizedProducts);
  

  // const categorizedProducts = products.reduce((acc, item) => {
  //   const category = item.category?.name;

    
  //   if (!acc[category]) {
  //     acc[category] = [];
  //   }
    
  //   acc[category].push(item);
  //   return acc;
  // }, {});

 
  // const addToCart = (item) => {
  //   const existingProduct = cartData.find((product) => product.id === item._id);
  //   console.log("press add to cart");

  //   if (existingProduct) {
      
  //     const updatedCart = cartData.map((product) =>
  //       product.id === item._id
  //         ? { ...product, count: product.count + 1 }
  //         : product
  //     );
  //     setCartData(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     console.log(updatedCart);
  //   } else {
      
  //     const updatedCart = [
  //       ...cartData,
  //       {
  //         id: item._id,
  //         name: item.name,
  //         count: 1,
  //         thumbnail: item.thumbnail,
  //         price: item.price,
  //       }, 
  //     ];
  //     setCartData(updatedCart);
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  //     console.log(updatedCart);
  //   }
  // };

  

  return (
    <div >
      <div
        className="m-5 rounded-xl"
        style={{
          backgroundImage: `url('/images/van-cleef-arpels-perlee-page-famille-joaillerie-2880x1614_perlée_2024.avif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          padding: "0 50px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1
        }}
      >
        <div
          className="p-5 font-semibold text-6xl stroke-teal-900"
          style={{
            position: "absolute",
            bottom: "60px",
            left: "60px",
            fontFamily: `'Dancing Script', cursive`,
          }}
        >
          <div>shine on</div>
          <div>shine bright</div>
          <div>Be unique</div>
        </div>
      </div>
      <div className="p-5">
        {/* {Object.keys(categorizedProducts).map((category) => (
          
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category || "Uncategorized"}</h2>

            <div className="grid grid-cols-3 gap-7">
              {categorizedProducts[category].map((item) => (
                <ProductCard key={item._id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        ))} */}
        {Object.keys(categorizedProducts).map((category) => {
          const productsInCategory = categorizedProducts[category];

          // Display all products if a category is selected, otherwise show only 3 random products
          const displayedProducts = selectedCategoryId
            ? productsInCategory // Show all products when a category is selected
            : productsInCategory.sort(() => 0.5 - Math.random()).slice(0, 3); // Show 3 random products

          return (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-bold mb-4">{category || "Uncategorized"}</h2>

              <div className="grid grid-cols-3 gap-7">
                {displayedProducts.map((item) => (
                  <ProductCard key={item._id} item={item} addToCart={addToCart} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
