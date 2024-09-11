import { Button, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  return (
    <div className="bg-cover bg-center"  style={{
        backgroundImage:`url('/images/abstract-big-data-digital-technology-background-design_1017-22920.avif')`,}}>
      <div className="flex justify-center items-start flex-col h-screen ml-20">
     
        <form className="flex flex-col justify-center items-center gap-3 border-2 bg-teal-800 text-white p-10  w-1/3 rounded-3xl h-2/3">
          {/* <input className='bg-slate-200 rounded-md mx-4 p-2 w-full text-black' 
          type='text' 
          id="phone" 
          placeholder='Enter your phonenumber'
          
          />
        
          <input className='bg-slate-200 rounded-md mx-4 p-2 w-full text-black' 
          type='password' 
          placeholder='Enter your password'
          id="password" 
          
          /> */}
          <Stack spacing={5}>
            <Input
              placeholder="Enter Admin Username"
              size="lg"
              variant="flushed"
            />
            <InputGroup size="lg" variant="flushed">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" bg={"teal"} textColor={"white"} onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          {/* <button type='submit' className='bg-slate-200 text-sky-950 px-3 py-1 rounded-md'>
          {
            isPending ? "Loading..." : "Login"
          }
          Login
        </button> */}
          <Button colorScheme="teal" size="md" >
            {/* {
            isPending ? "Loading..." : "Login"
          } */}
            login
          </Button>
        </form>
      </div>
    </div>
  );
}
