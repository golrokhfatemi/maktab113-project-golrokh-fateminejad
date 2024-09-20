import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Hook/useLogin";
import Cookies from 'js-cookie'
import { useEffect } from "react";



export default function AdminLoginPage() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {mutate , isPending} = useLogin()
  const navigate = useNavigate()
  
 
  const handleLogin =(e)=>{
    e.preventDefault()
    console.log("hi");
    
    const values ={
      username : e.target["username"]. value ,
      password : e.target["password"].value
    }
    mutate(values ,{
      onSuccess : (res) => {
        console.log(res)
        Cookies.set("accessToken" , res.token.accessToken)
        Cookies.set("refreshToken" , res.token.refreshToken)
        navigate('/panel-admin')
      }
    })
  }
 
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/abstract-big-data-digital-technology-background-design_1017-22920.avif')`,
      }}
    >
      <div className="flex justify-center items-start flex-col h-screen ml-20">
        <form
          className="flex flex-col justify-center items-center gap-3 border-2 bg-teal-800 text-white p-10  w-1/3 rounded-3xl h-2/3"
          onSubmit={handleLogin}
        >
      
          <Stack spacing={5}>
            <Input
              placeholder="Enter Admin Username"
              size="lg"
              variant="flushed"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
            {errors.username && (
            <div style={{ color: 'red' }}>{errors.username}</div>
          )}
            <InputGroup size="lg" variant="flushed">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  bg={"teal"}
                  textColor={"white"}
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
            <div style={{ color: 'red' }}>{errors.password}</div>
          )}
          </Stack>
         
          <Button colorScheme="teal" size="md" type="submit" >
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

