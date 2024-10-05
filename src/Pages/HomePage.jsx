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
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ProductCard from "../Components/Card";

export default function HomePage() {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useOutletContext();
  const { data: productsData } = useGetProducts(
    currentPage,
    itemsPerPage,
    selectedCategory
  );

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
            {/* عنوان دسته‌بندی */}
            <h2 className="text-2xl font-bold mb-4">{category || 'null'}</h2>
            
            {/* محصولات مربوط به این دسته‌بندی */}
            <div className="grid grid-cols-3 gap-7">
              {categorizedProducts[category].map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

