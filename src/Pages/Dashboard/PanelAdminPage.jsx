
import { Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Box, Stack, Checkbox } from '@chakra-ui/react';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useGetProducts } from '../../Hook/useGetProducts';
import { useQueryClient } from 'react-query';



export default function PanelAdminPage() {
  const [filters, setFilters] = useState({
    delivered: false,
    inProcess: false,
  });
  const qc = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const {data} = useGetProducts(currentPage , itemsPerPage)
console.log(data);

  const orders = [
    { id: 12345, customer: 'ali ahmadi', status: 'Delivered' },
    { id: 67890, customer: 'goli fatemi', status: 'In Process' },
    { id: 54321, customer: 'mahyar adib', status: 'Delivered' },
  ];


  const filteredOrders = orders.filter(order => {
    if (filters.delivered && order.status === 'Delivered') {
      return true;
    }
    if (filters.inProcess && order.status === 'In Process') {
      return true;
    }
    if (!filters.delivered && !filters.inProcess) {
      return true; 
    }
    return false;

  });
    const handleFilterChange = (filter) => {
      setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
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
                {
                  data?.data?.products.map((item) =>(
                    
                    
                    <Tr key={item.id}>
                      <Td>{item.thumbnail}</Td>
                      <Td>{item.slugname}</Td>
                      <Td>{item.category.name} , {item.subcategory.name}</Td>
                      <Td>
                      <Box className='flex flex-row gap-4'>
                      <CiEdit className='text-2xl'/>
                      <MdOutlineDeleteOutline className='text-2xl'/>
                      </Box>
                      </Td>
                    </Tr>
                  ))
                }
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
                <Tr>
                  <Td>Image 2</Td>
                  <Td>Product 2</Td>
                  <Td>Category 2</Td>
                  <Td>
                  <Box className='flex flex-row gap-4'>
                  <CiEdit className='text-2xl'/>
                  <MdOutlineDeleteOutline className='text-2xl'/>
                  </Box>
                  </Td>
                </Tr>
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
                <Tr>
                  <Td>Item 1</Td>
                  <Td>1000$</Td>
                  <Td>100</Td>
                </Tr>
                <Tr>
                  <Td>Item 2</Td>
                  <Td>2000$</Td>
                  <Td>50</Td>
                </Tr>
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Stack direction="row" spacing={4} mb={4}>
              <Checkbox 
                isChecked={filters.delivered}
                onChange={() => handleFilterChange('delivered')}
              >
                Delivered
              </Checkbox>
              <Checkbox 
                isChecked={filters.inProcess}
                onChange={() => handleFilterChange('inProcess')}
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
              <Tbody>
                <Tr>
                  <Td>ali ahmadi</Td>
                  <Td>15000$</Td>
                  <Td>july</Td>
                  <Td>in proccess</Td>
                </Tr>
                <Tr>
                <Td>ali ahmadi</Td>
                  <Td>15000$</Td>
                  <Td>july</Td>
                  <Td>Delivered</Td>
                </Tr>
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

