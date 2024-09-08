


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
} from '@chakra-ui/react'
import React from 'react';





export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  

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
  return (
    <div>
        <header className="flex justify-between m-5">
        <div className='flex flex-row gap-4'>
        <CiMenuBurger  className='text-2xl w-10 cursor-pointer' onClick={onOpen} /> 
        <p>Menu</p>
        </div>
            
            <div className='flex flex-row gap-4'>
            
              <MdOutlinePhoneInTalk className='text-2xl'/>
              <MdOutlineMail className='text-2xl'/>
            </div>
        </header>
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          

          <DrawerBody className='flex flex-col gap-6 justify-start mt-16 '>
            <Link>HOME</Link>
            <Link>PRODUCTS</Link>
            <Link>ABOUT US</Link>
            <Link>CONTACT US</Link>
            
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
    
  )
}


