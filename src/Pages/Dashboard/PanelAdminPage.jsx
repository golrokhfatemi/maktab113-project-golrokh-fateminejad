import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Stack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useGetProducts } from "../../Hook/useGetProducts";
import { useQueryClient } from "react-query";
import AddProductModal from "../AddProduct/AddProductModal";



export default function PanelAdminPage() {
  const [filters, setFilters] = useState({
    delivered: false,
    inProcess: false,
  });
  // const qc = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () =>{
    console.log("modal open");
    setIsModalOpen(true);
    
  } 
  const closeModal = () => setIsModalOpen(false);
  
  const itemsPerPage = 100;
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  // const { data: usersData } = useGetUsers(currentPage, itemsPerPage);
  // console.log(usersData);
  
  // console.log(data);
  // console.log(data1);

  const orders = [
    { id: 12345, customer: "ali ahmadi", status: "Delivered" },
    { id: 67890, customer: "goli fatemi", status: "In Process" },
    { id: 54321, customer: "mahyar adib", status: "Delivered" },
  ];
 

  const filteredOrders = orders.filter((order) => {
    if (filters.delivered && order.status === "Delivered") {
      return true;
    }
    if (filters.inProcess && order.status === "In Process") {
      return true;
    }
    if (!filters.delivered && !filters.inProcess) {
      return true;
    }
    return false;
  });
  const handleFilterChange = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };
  return (
    <div className="p-6">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Products</Tab>
          <Tab>In stock</Tab>
          <Tab>Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            
              <Button colorScheme='teal' variant='outline' m={10} onClick={openModal}>
                Add New Product
              </Button>
            <Table variant="simple">
              <Thead>
              
              
                <Tr>
                  <Th>Product Image</Th>
                  <Th>Product Name</Th>
                  <Th>Category</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productsData?.data?.products.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <img
                        src={`http://localhost:8000/images/products/thumbnails/${item.thumbnail}`}
                        alt={item.thumbnail}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </Td>
                    <Td>{item.slugname}</Td>
                    <Td>
                      {item.category.name} , {item.subcategory.name}
                    </Td>
                    <Td>
                      <Box className="flex flex-row gap-4">
                        <CiEdit className="text-2xl" />
                        <MdOutlineDeleteOutline className="text-2xl" />
                      </Box>
                    </Td>
                  </Tr>
                ))}
                {/* <Tr>
                  <Td>Image 1</Td>
                  <Td>Product 1</Td>
                  <Td>Category 1</Td>
                  <Td>
                  <Box className='flex flex-row gap-4'>
                  <CiEdit className='text-2xl'/>
                  <MdOutlineDeleteOutline className='text-2xl'/>
                  </Box>
                  </Td>
                </Tr> */}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th>Price</Th>
                  <Th>Stock Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productsData?.data?.products.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.slugname}</Td>
                    <Td>{item.price}$</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Stack direction="row" spacing={4} m={10}>
              <Checkbox
                isChecked={filters.delivered}
                onChange={() => handleFilterChange("delivered")}
              >
                Delivered
              </Checkbox>
              <Checkbox
                isChecked={filters.inProcess}
                onChange={() => handleFilterChange("inProcess")}
              >
                In Process
              </Checkbox>
            </Stack>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Customer Name</Th>
                  <Th>Total Price</Th>
                  <Th>Time of order</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              {/* <Tbody>
                {usersData?.data?.products.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.user.firstname}</Td>
                    <Td>15000$</Td>
                    <Td>july</Td>
                    <Td>in proccess</Td>
                  </Tr>
                ))}
              </Tbody> */}
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />

    </div>
  );
}
