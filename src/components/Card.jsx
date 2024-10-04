import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Button, Image, Divider, Flex, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';

export default function ProductCard({item}) {
  const cleanDescription = DOMPurify.sanitize(item.description, { ALLOWED_TAGS: [] });
  return (
    <div>
        <Card key="item.id" className='h-full'>
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
              <Button variant="solid" colorScheme="teal">
                Add To Cart
              </Button>
            </Flex>
          </Card>
    </div>
  )
}
