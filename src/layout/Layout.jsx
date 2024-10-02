import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";

export default function Layout() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products,setProducts] = useState([])
  console.log(products);
  
  
  return (
    <div>
      <Header setSelectedCategory={setSelectedCategory} setProducts={setProducts}/>
      <Outlet context={[selectedCategory, products]} />
      <Footer/>
    </div>
  );
}
