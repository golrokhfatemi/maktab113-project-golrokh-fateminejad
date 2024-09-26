import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import httpRequest from "../Services/Http-request";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Product ID:", id);

    httpRequest
      .get(`/api/products/${id}`)

      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  console.log(product);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    // <div className='border border-teal-800 p-3 m-5 flex flex-col gap-3 justify-center items-center'>
    //       <h1>{product.data.product.name}</h1>
    //   <div className='flex flex-row'>
    //       <img src={`http://${product.data.product.images}`}  />
    //       <p>{product.data.product.description}</p>
    //   </div>
    //   <p>Price: ${product.data.product.price}</p>
    //   <p>{product.data.product.brand}</p>

    // </div>

    <Card maxW="2lg" className="px-10">
  <CardBody className=" flex items-center justify-center h-full m-4">
    <Stack mt="6" spacing="3">
      <Box className="flex flex-row">
        <Box className="flex flex-col p-16 gap-5 w-full">
          <Heading size="md">{product.data.product.name}</Heading>

          <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{product.data.product.category.name}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">{product.data.product.subcategory.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Text class="line-clamp-4">{product.data.product.description}</Text>
          <Text color="teal" fontSize="xl">
            Price: $ {product.data.product.price}
          </Text>
          <Button colorScheme="teal" size="lg">
            Add To Cart
          </Button>
        </Box>

        {/* اضافه کردن کلاس‌های flex برای والد تصویر */}
        <Box className="flex items-center justify-center">
          <Image
            width={600}
            height={400}
            src={`http://${product.data.product.images}`}
            borderRadius="lg"
          />
        </Box>
      </Box>
    </Stack>
  </CardBody>
</Card>

  );
}
