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
import { Link, useOutletContext } from "react-router-dom";
import ProductCard from "../Components/Card";
import { CartContext } from "../Services/Context/Context";

export default function HomePage() {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useOutletContext();
  const { data: productsData } = useGetProducts(
    currentPage,
    itemsPerPage,
    selectedCategory
  );
  const {addToCart} = useContext(CartContext)
  
  const [cartData, setCartData] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const products = productsData?.data?.products || [];

  const categorizedProducts = products.reduce((acc, item) => {
    const category = item.category.name;

    // اگر دسته‌بندی موجود نیست، آن را اضافه می‌کنیم
    if (!acc[category]) {
      acc[category] = [];
    }
    // محصول را به دسته مربوطه اضافه می‌کنیم
    acc[category].push(item);
    return acc;
  }, {});

  // به‌روزرسانی سبد خرید
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
    <div>
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
        {Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category || "null"}</h2>

            <div className="grid grid-cols-3 gap-7">
              {categorizedProducts[category].map((item) => (
                <ProductCard key={item._id} item={item} addToCart={addToCart} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
