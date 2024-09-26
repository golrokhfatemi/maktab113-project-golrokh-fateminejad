import {
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Divider,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { useGetProducts } from "../Hook/useGetProducts";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  console.log(productsData);

  return (
    <div className=" grid grid-cols-3 gap-7 mx-5 ">
      {productsData?.data?.products.map((item) => (
        <Card key="item.id">
          <CardBody>
            <Link to={`/products/${item._id}`}>
              <Image
                src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                borderRadius="lg"
              />
            </Link>

            <Stack mt="8" spacing="6">
              <Heading size="md">{item.name}</Heading>
              <Text>{item.description}</Text>
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
      ))}
    </div>
  );
}
