


import { MdOutlineMail, MdOutlinePhoneInTalk } from 'react-icons/md';
import { CiMenuBurger } from 'react-icons/ci';
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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import httpRequest from '../Services/http-request';






export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const btnRef = React.useRef();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  
  

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

  const fetchProducts = async (category) => {
    try {
      const response = await httpRequest.get(`/api/products?category=${category}`);
      setProducts(response.data.products); // محصولات فیلتر شده
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // انتخاب کتگوری و فیلتر محصولات
  };


  return (
    <div className='px-10 py-5'>
        <header className="flex justify-between ">
        <div className='flex flex-row gap-4'>
        <CiMenuBurger  className='text-2xl w-10 cursor-pointer' onClick={onOpen} /> 
        <p>Menu</p>
        </div>
        <Link href="/">
        <div className='text-3xl ط'><b>B</b>e<b>L</b>ova</div>
        </Link>
            
            <div className='flex flex-row gap-4'>
            
            <Popover
            isOpen={isPopoverOpen}
            onOpen={() => setIsPopoverOpen(true)}
            onClose={() => setIsPopoverOpen(false)}
            placement="right-end"
          >
            <PopoverTrigger>
              <MdOutlinePhoneInTalk className='text-2xl cursor-pointer' />
            </PopoverTrigger>
            <PopoverContent bg="gray.800" color="white" p={4}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight="bold">Contact Information</PopoverHeader>
              <PopoverBody>
                <Box>
                  <p>Phone: +1234567890</p>
                  <p>Email: contact@example.com</p>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
              <MdOutlineMail className='text-2xl cursor-pointer'/>
            </div>
        </header>
        <Drawer
        isOpen={isOpen}
        placement='left'
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
          <DrawerBody className='flex flex-col gap-6 justify-start mt-16'>
            <Box>
              <Link href="#" fontSize="lg">HOME</Link>
            </Box>
            <Box>
              <Box display="flex" alignItems="center" onClick={toggleProducts} cursor="pointer">
                <Link fontSize="lg">PRODUCTS</Link>
                <IconButton
                  aria-label="Toggle Products Submenu"
                  icon={isProductsOpen ? <ChevronUpIcon  boxSize={6} color="white" /> : <ChevronDownIcon  boxSize={6} color="white" />}
                  variant="link"
                  ml={2}
                />
              </Box>
              <Collapse in={isProductsOpen}>
                <Box pl={20}>
                  <div className='flex flex-col gap-5 pt-6'>
                  <Link href="#" fontSize="lg" onClick={() => handleCategoryClick('Jewelry')}>Jewelry</Link>
                  <Link href="#" fontSize="lg" onClick={() => handleCategoryClick('Watches')}>Watches</Link>
                  <Link href="#" fontSize="lg" onClick={() => handleCategoryClick('Luxury Pen')}>Luxury Pen</Link>
                  <Link href="#" fontSize="lg" onClick={() => handleCategoryClick('Keychain')}>Keychain</Link>
                  </div>
                </Box>
              </Collapse>
            </Box>
            <Box>
              <Link href="#"  fontSize="lg">ABOUT US</Link>
            </Box>
            <Box>
              <Link href="#"  fontSize="lg">CONTACT US</Link>
            </Box>
          </DrawerBody>

          
        </DrawerContent >
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
    
  )
}


