import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";

export default function Layout() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  
  
  return (
    <div>
      <Header setSelectedCategory={setSelectedCategory} />
      <Outlet context={[selectedCategory]} />
      <Footer />
    </div>
  );
}
