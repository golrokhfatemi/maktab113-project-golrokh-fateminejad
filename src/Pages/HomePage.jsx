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
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ProductCard from "../Components/Card";

export default function HomePage() {
  const itemsPerPage = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory] = useOutletContext();
  const { data: productsData } = useGetProducts(
    currentPage,
    itemsPerPage,
    selectedCategory
  );
  // console.log(productsData);

  return (
    <div>
      <div
        className="m-5 rounded-xl"
        style={{
          backgroundImage: `url('/images/van-cleef-arpels-perlee-page-famille-joaillerie-2880x1614_perlée_2024.avif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          padding: "0 50px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* <Image
                 src={`/images/van-cleef-arpels-perlee-page-famille-joaillerie-2880x1614_perlée_2024.avif`}
                borderRadius="lg"
              /> */}
        <div
          className="p-5 font-semibold text-6xl stroke-teal-900"
          style={{
            position: "absolute",
            bottom: "60px",
            left: "60px",
            fontFamily: `'Dancing Script', cursive`,
          }}
        >
          <div>shine on</div>
          <div>shine bright</div>
          <div>Be unique</div>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-7 m-5 ">
        {productsData?.data?.products?.map((item) => (
          <ProductCard item={item}/>
          // <Card key="item.id">
          //   <CardBody>
          //     <Link to={`/products/${item._id}`}>
          //       <Image
          //         src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
          //         borderRadius="lg"
          //       />
          //     </Link>

          //     <Stack mt="8" spacing="6">
          //       <Heading size="md">{item.name}</Heading>
          //       <Text>{item.description}</Text>
          //     </Stack>
          //   </CardBody>
          //   <Divider />

          //   <Flex padding={6} align="center">
          //     <Text color="blue.600" fontSize="xl">
          //       ${item.price}
          //     </Text>
          //     <Spacer />
          //     <Button variant="solid" colorScheme="teal">
          //       Add To Cart
          //     </Button>
          //   </Flex>
          // </Card>
        ))}
      </div>
    </div>
  );
}
