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
import Pagination from "../../Components/Pagination";
import useDeleteProduct from "../../Hook/useDeleteProduct";



export default function PanelAdminPage() {
  const [filters, setFilters] = useState({
    delivered: false,
    inProcess: false,
  });
  const qc = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  console.log(productsData);
  const [deleteModal ,setDeleteModal] = useState(false)
  const [deleteVal, setDeleteVal] = useState({});
  const {mutate} = useDeleteProduct()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () =>{
    console.log("modal open");
    setIsModalOpen(true);
    
  } 
  const closeModal = () => setIsModalOpen(false);
  
  const handleShowDeleteModal = (id) => {
    setDeleteVal(id)
    setDeleteModal(true)
   }

   const handleConfirmDelete = () => {
  
    mutate(deleteVal, {
      onSuccess: () => {
        console.log(" deleted ");
        qc.invalidateQueries({ queryKey : ["products"] }); 
        setDeleteModal(false); 
      },
    });
  };


  const handleCloseModal = () => {
    setDeleteModal(false);
  };
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
                        <MdOutlineDeleteOutline className="text-2xl" onClick={() => handleShowDeleteModal(item._id)}/>
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
        {
                productsData?.total && 
                <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                
              />
              }
      </Tabs>
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-14 rounded-2xl shadow-lg flex flex-col gap-4">
            <h2>Are you sure you want to delete this product?</h2>
            <div className='flex flex-row justify-around'>
            <button className='bg-slate-800 text-white px-3 py-2 rounded-md m-2 cursor-pointer'  onClick={handleCloseModal}>Cancel</button>
            <button className='bg-slate-800 text-white px-3 py-2 rounded-md m-2' onClick={handleConfirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
