// import { Outlet } from "react-router-dom";

// import Footer from "./Footer";
// import Header from "./Header";
// import { useState } from "react";

// export default function Layout(cartData , setCartData) {
//   const [selectedCategory, setSelectedCategory] = useState(null);

  
  
//   return (
//     <div>
//       <Header setSelectedCategory={setSelectedCategory} cartData={cartData} setCartData={setCartData} />
//       <Outlet context={[selectedCategory]} />
//       <Footer />
//     </div>
//   );
// }
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from "react";

export default function Layout({ cartData, setCartData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header at the top */}
      <header >
        <Header setSelectedCategory={setSelectedCategory} cartData={cartData} setCartData={setCartData} />
      </header>

      {/* Main content (Outlet) in the center */}
      <main className="flex-grow flex justify-center items-start mt-20">
        <Outlet context={[selectedCategory]} />
      </main>

      {/* Footer at the bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
