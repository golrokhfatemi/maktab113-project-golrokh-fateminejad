import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button, Image, Divider, Flex, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { useContext } from 'react';
import { CartContext } from '../Services/Context/Context';

export default function ProductCard({item}) {
  const cleanDescription = DOMPurify.sanitize(item.description, { ALLOWED_TAGS: [] });
  const { addToCart } = useContext(CartContext);

  // const handleAddToCart = (product) => {
  //   console.log("click button Add To Cart");
    
  //   setCartData((prevCart) => {
  //     const existingProduct = prevCart.find((item) => item.product._id === product._id);
  //     if (existingProduct) {
  //       return prevCart.map((item) =>
  //         item.product._id === product._id
  //           ? { ...item, count: item.count + 1 }  // افزایش تعداد محصول در صورت موجود بودن
  //           : item
  //       );
  //     } else {
  //       return [...prevCart, { product: product, count: 1 }];  // افزودن محصول جدید با جزئیات کامل
  //     }
  //   });
  // };



  return (
    <div>
        <Card key="item._id" className='h-full'>
            <CardBody>
              <Link to={`/products/${item._id}`}>
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                  borderRadius="lg"
                />
              </Link>

              <Stack mt="8" spacing="6">
                <Heading size="md">{item.name}</Heading>
                <Text className="line-clamp-6">{cleanDescription}</Text>
                {/* <Text className="line-clamp-5">{item.description}</Text> */}
                
              </Stack>
            </CardBody>
            <Divider />

            <Flex padding={6} align="center">
              <Text color="blue.600" fontSize="xl">
                ${item.price}
              </Text>
              <Spacer />
              <Button variant="solid" colorScheme="teal" onClick={() => addToCart(item)}>
                Add To Cart
              </Button>
            </Flex>
          </Card>
    </div>
  )
}
