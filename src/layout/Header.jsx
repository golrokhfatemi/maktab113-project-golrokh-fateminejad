import { MdOutlineMail, MdOutlinePhoneInTalk } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  Text,
  Box,
  IconButton,
  Collapse,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Badge,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import httpRequest from "../Services/http-request";
import { Navigate, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import Cart from "../Pages/Cart";
import { CartContext } from "../Services/Context/Context";

export default function Header({ setSelectedCategory }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  // const [cartData, setCartData] = useState([]);
  const{cartData ,setCartData} = useContext(CartContext)
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const btnRef = React.useRef();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const [products, setProducts] = useState([]);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // }

  // const handleClickOutside = (event) => {
  //   if (event.target.closest('.menu-container') === null) {
  //     setIsMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);

  const fetchCategories = async () => {
    try {
      const response = await httpRequest.get("/api/categories");
      // console.log(response.data.data.categories);

      setCategories(response.data.data.categories);
    } catch (error) {
      // console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    // Calculate the number of items in the Cart
    const count = cartData.length;
    setCartCount(count);
  }, [cartData]);

  const handleCategoryClick = (categoryId) => {
    console.log(categoryId);

    setSelectedCategory(categoryId);
    navigate(`?category=${categoryId}`);
    onClose();
  };

  return (
    <div className="px-10 py-5">
      <header className="flex justify-between ">
        <div className="flex flex-row gap-4">
          <CiMenuBurger
            className="text-2xl w-10 cursor-pointer"
            onClick={onOpen}
          />
          <p>Menu</p>
        </div>
        <Link href="/">
          <div className="text-3xl">
            <b>B</b>e<b>L</b>ova
          </div>
        </Link>

        <div className="flex flex-row gap-4">
          <Popover
            isOpen={isPopoverOpen}
            onOpen={() => setIsPopoverOpen(true)}
            onClose={() => setIsPopoverOpen(false)}
            placement="bottom-start"
          >
            <PopoverTrigger>
              <MdOutlinePhoneInTalk className="text-2xl cursor-pointer" />
            </PopoverTrigger>
            {/* <FiShoppingCart className="text-2xl cursor-pointer"  onClick={() => setCartIsOpen(true)}/> */}
            <Box position="relative" display="inline-block">
              
                
                  <FiShoppingCart
                  backgroundColor="none"
                    className="text-2xl cursor-pointer "
                    onClick={() => setCartIsOpen(true)}
                  />
                  
                
                
              
              {cartCount > 0 && (
                <Badge
                  
                  borderRadius="full"
                  position="absolute"
                  top="-2"
                  right="-4"
                  fontSize="0.8em"
                  backgroundColor="#a2dbcc"
                  
                >
                  {cartCount}
                </Badge>
              )}
            </Box>

            <PopoverContent bg="gray.800" color="white" p={6}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="bold">
                Contact Information
              </PopoverHeader>
              <PopoverBody>
                <Box>
                  <p>Phone: +1234567890</p>
                  <p>Email: contact@example.com</p>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* <MdOutlineMail className="text-2xl cursor-pointer" /> */}
        </div>
      </header>
      <Cart
        isOpen={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
        cartData={cartData}
        setCartData={setCartData}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#5d877d" color="white">
          <DrawerCloseButton />

          {/* <DrawerBody className='flex flex-col gap-6 justify-start mt-16 '>
            <Link>HOME</Link>
            <Link>PRODUCTS</Link>
            <Text fontSize="sm" color="gray.500">Jewelry, Watches</Text>
            <Link>ABOUT US</Link>
            <Link>CONTACT US</Link>
            
          </DrawerBody> */}
          <DrawerBody className="flex flex-col gap-6 justify-start mt-16">
            <Box>
              <Link href="#" fontSize="lg">
                HOME
              </Link>
            </Box>
            <Box>
              <Box
                display="flex"
                alignItems="center"
                onClick={toggleProducts}
                cursor="pointer"
              >
                <Link fontSize="lg">PRODUCTS</Link>
                <IconButton
                  aria-label="Toggle Products Submenu"
                  icon={
                    isProductsOpen ? (
                      <ChevronUpIcon boxSize={6} color="white" />
                    ) : (
                      <ChevronDownIcon boxSize={6} color="white" />
                    )
                  }
                  variant="link"
                  ml={2}
                />
              </Box>
              <Collapse in={isProductsOpen}>
                <Box pl={20}>
                  <div className="flex flex-col gap-5 pt-6">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        fontSize="lg"
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    {/* <Link
                      fontSize="lg"
                      onClick={() => handleCategoryClick("66f1c1642894236d4656d2f2")}
                    >
                      Jewelry
                    </Link>
                    <Link
                      fontSize="lg"
                      onClick={() =>
                        handleCategoryClick("66f1cb142894236d4656d384")
                      }
                    >
                      Watches
                    </Link>
                    <Link
                      fontSize="lg"
                      onClick={() => handleCategoryClick("66f5bb8772d3643ca1f51c7a")}
                    >
                      Luxury Pen
                    </Link>
                    <Link
                      fontSize="lg"
                      onClick={() => handleCategoryClick("Keychain")}
                    >
                      Keychain
                    </Link> */}
                  </div>
                </Box>
              </Collapse>
            </Box>
            <Box>
              <Link fontSize="lg" cursor="pointer" onClick={onClose}>
                ABOUT US
              </Link>
            </Box>
            <Box>
              <Link fontSize="lg" cursor="pointer" onClick={onClose}>
                CONTACT US
              </Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* {isMenuOpen && (
        <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg z-50`}
      >
        <div className="p-4">
          <ul>
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">Home۱</NavLink></li>
            <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="block py-2">About</NavLink></li>
            <li><NavLink to="/services" onClick={() => setIsMenuOpen(false)} className="block py-2">Services</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2">Contact</NavLink></li>
          </ul>
        </div>
      </div>
      )} */}
    </div>
  );
}
