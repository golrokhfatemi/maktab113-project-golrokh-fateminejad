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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const images = product.data.product.images; // دریافت تصاویر
  const totalImages = images.length;

  // فانکشن برای رفتن به تصویر بعدی
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === totalImages - 1 ? 0 : prevIndex + 1
    );
  };

  // فانکشن برای رفتن به تصویر قبلی
  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

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

    <Card maxW="zlg" className=" m-5 rounded-xl">
      <CardBody className=" flex  justify-center h-full gap-3 ">
        <Stack mt="6" spacing="3">
          <Box className="flex flex-row gap-32">
            <Box className="flex flex-col justify-center gap-5 w-full ">
              <Heading size="md">{product.data.product.name}</Heading>

              <Breadcrumb
                spacing="8px"
                separator={<ChevronRightIcon color="gray.500" />}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    {product.data.product.category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    {product.data.product.subcategory.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Text class="line-clamp-4">
                {product.data.product.description}
              </Text>
              <Text color="teal" fontSize="xl">
                Price: $ {product.data.product.price}
              </Text>
              <Button colorScheme="teal" size="lg">
                Add To Cart
              </Button>
            </Box>

            <Box className="felx flex-col">
              {/* اضافه کردن کلاس‌های flex برای والد تصویر */}
              <Box className="flex items-center justify-center">
                <Button onClick={handlePrev}>{"<"}</Button>
                <Image
                  width={600}
                  height={400}
                  src={`http://${images[currentImageIndex]}`}
                  borderRadius="lg"
                />
                <Button onClick={handleNext}>{">"}</Button>
              </Box>
              {/* نقاط زیر تصویر (Indicators) */}
              <Box display="flex" mt={4} justifyContent="center" gap={2}>
                {images.map((_, index) => (
                  <Box
                    key={index}
                    width={3}
                    height={3}
                    borderRadius="50%"
                    bg={index === currentImageIndex ? "teal" : "gray"}
                    onClick={() => goToImage(index)} // تغییر به تصویر مربوطه
                    cursor="pointer"
                  />
                ))}
              </Box>

              {/* نمایش تصاویر کوچک زیر عکس اصلی */}
              <Box display="flex" mt={4} justifyContent="center" gap={2}>
                {images.map((img, index) => (
                  <Image
                    key={index}
                    width={70}
                    height={20}
                    src={`http://${img}`}
                    borderRadius="lg"
                    border={
                      index === currentImageIndex ? "2px solid teal" : "none"
                    } // هایلایت عکس فعلی
                    cursor="pointer"
                    onClick={() => goToImage(index)} // تغییر به تصویر مربوطه
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
