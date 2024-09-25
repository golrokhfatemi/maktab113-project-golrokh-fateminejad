import { Card, CardHeader, CardBody,ButtonGroup, CardFooter, Stack, Heading, Text, Button, Image,Divider } from '@chakra-ui/react'
import { useGetProducts } from "../Hook/useGetProducts";
import { useState } from "react";

export default function HomePage() {
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] =useState(1);
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  console.log(productsData);
  
  return (
    <div className=' grid grid-cols-3 gap-7 mx-5 '>
    {
      productsData?.data?.products.map((item) => (
        <Card key="item.id">
  <CardBody>
  <Link to={`/product/${item.id}`}>
    <Image
      src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    </Link>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{item.name}</Heading>
      {/* <Text>
        {item.description}
      </Text> */}
      <Text color='blue.600' fontSize='2xl'>
        ${item.price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
      ))
    }
      
    </div>
  )
}





