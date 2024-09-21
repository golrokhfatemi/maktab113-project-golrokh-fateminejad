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
  Button,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useGetProducts } from "../../Hook/useGetProducts";
import { useQueryClient } from "react-query";
import AddProductModal from "../AddProduct/AddProductModal";
import Pagination from "../../Components/Pagination";
import useDeleteProduct from "../../Hook/useDeleteProduct";
import { useGetOrders } from "../../Hook/useGetOrders";
import Cookies from "js-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";



export default function PanelAdminPage() {
  // const [filters, setFilters] = useState({
  //   delivered: false,
  //   inProcces: false,
  // });
  const qc = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('');
  const itemsPerPage = 4;
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  const { data: ordersData } = useGetOrders(currentPage, itemsPerPage);
  console.log(productsData);
  console.log(ordersData);
  const [deleteModal ,setDeleteModal] = useState(false)
  const [deleteVal, setDeleteVal] = useState({});
  const {mutate} = useDeleteProduct()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const deliveryStatus = searchParams.get("deliveryStatus");
  const [filters, setFilters] = useState({
    delivered: deliveryStatus === 'true',
    inProcces: deliveryStatus === 'false',
  });

  // useEffect(() => {
  //   setFilters({
  //     delivered: deliveryStatus === 'true',
  //     inProcces: deliveryStatus === 'false', 
  //   });
  // }, [deliveryStatus]);


// const handleFilterChange = (value) => {
//   setFilter(value);
//   setFilters({
//     delivered: value === 'delivered',
//     inProcces: value === 'inProcces',
//   });
// };

const handleFilterChange = (filter) => {
  setFilters((prev) => {
    let newFilters = { delivered: false, inProcces: false }; // همه فیلترها به حالت اولیه قرار می گیرند

    
    if (filter === "delivered") {
      newFilters.delivered = true;
      setSearchParams({ deliveryStatus: 'true' });
    } else if (filter === "inProcces") {
      newFilters.inProcces = true;
      setSearchParams({ deliveryStatus: 'false' });
    } else if (filter === "all") {
      searchParams.delete("deliveryStatus");
      setSearchParams(searchParams);
    }

    return newFilters;
  });
};



const filteredOrders = ordersData?.data?.orders.filter((order) => {
  if (filters.delivered && order.deliveryStatus === true) {
    return true;
  }
  if (filters.inProcces && order.deliveryStatus === false) {
    return true;
  }
  if (!filters.delivered && !filters.inProcces) {
    return true;
  }
  return false;
});

useEffect(() => {
 
  if (activeTab !== 'orders') {
    searchParams.delete("deliveryStatus");
    setSearchParams(searchParams);
  }
}, [activeTab, searchParams, setSearchParams]);



  const openModal = () =>{
    console.log("modal open");
    setIsModalOpen(true);
    
  } 
  const closeModal = () => {
    console.log("close modal");
    
    setIsModalOpen(false);
  }
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

 

 


  
  // const handleFilterChange = (filter) => {
  //   setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  // };
  const totalOrders = ordersData?.total || 0;


  const handleLogout = () => {
    Cookies.remove('accessToken');
    navigate('/admin-login');
  };
  
  return (
    <div className="p-6">
      <Box display="flex" justifyContent="flex-end" mb={4}>
      <Button  colorScheme='teal' variant='outline' m={3} onClick={handleLogout}>Logout</Button>
      <Link to={"/"}>
      <Button  colorScheme='teal' variant='outline' m={3} >Back to Home</Button>
      </Link>
      
      </Box>
      <Tabs variant="enclosed"  onChange={(index) => setActiveTab(index === 0 ? 'products' : index === 1 ? 'instock' : 'orders')}>
        
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
            {
                productsData?.total && 
                <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                
              />
              }
          </TabPanel>
          <TabPanel>
          <Button  colorScheme='teal' variant='outline' m={10} >save</Button>
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
            {
                productsData?.total && 
                <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                
              />
              }
          </TabPanel>
          <TabPanel>
            <Stack direction="row" spacing={4} m={10}>
            {/* <Checkbox
                isChecked={filters.delivered}
                onChange={() => handleFilterChange("delivered")}
              >
                Delivered
              </Checkbox>
              <Checkbox
                isChecked={filters.inProcces}
                onChange={() => handleFilterChange("inProcces")}
              >
                In Process
              </Checkbox> */}
              <RadioGroup >
              <Stack spacing={5} direction="row">
                <Radio value="all" onChange={() => handleFilterChange("all")}>All</Radio>
                <Radio value="delivered" isChecked={filters.delivered} onChange={() => handleFilterChange("delivered")}>Delivered</Radio>
                <Radio value="inProcces" isChecked={filters.inProcces} onChange={() => handleFilterChange("inProcces")}>In Process</Radio>
              </Stack>
              </RadioGroup>
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
              <Tbody>
                {filteredOrders && filteredOrders.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.user.firstname}    {item.user.lastname}</Td>
                    <Td>{item.totalPrice
                    }$</Td>
                    <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                    <Td>{item.deliveryStatus ? 'Delivered' : 'inProcces'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {activeTab === 'orders' && (
              <Pagination
                totalItems={totalOrders || 0}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
            
          </TabPanel>
          
        </TabPanels>
            {/* {
                productsData?.total && 
                <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                
              />
              } */}
              
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
