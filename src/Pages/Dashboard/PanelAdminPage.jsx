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
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useGetProducts } from "../../Hook/useGetProducts";
import { useMutation, useQueryClient } from "react-query";
import AddProductModal from "../AddProduct/AddProductModal";
import Pagination from "../../Components/Pagination";
import useDeleteProduct from "../../Hook/useDeleteProduct";
import { useGetOrders } from "../../Hook/useGetOrders";
import Cookies from "js-cookie";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import httpRequest from "../../Services/http-request";

export default function PanelAdminPage() {
  // const [filters, setFilters] = useState({
  //   delivered: false,
  //   inProcces: false,
  // });
  const qc = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("");
  const itemsPerPage = 4;
  const { data: productsData } = useGetProducts(currentPage, itemsPerPage);
  const { data: ordersData } = useGetOrders(currentPage, itemsPerPage);
  // console.log(productsData);
  // console.log(ordersData);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({
    user: {},
    items: [], 
    createdAt: null,
    deliveryTime: null,
  });
  const [statusModal, setStatusModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [deleteVal, setDeleteVal] = useState({});
  const { mutate } = useDeleteProduct();
  const [isEditMode, setIsEditMode] = useState(false);
  // const [EditMode, setEditMode] = useState({
  //   productId:null,
  //   field:null
  // });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const deliveryStatus = searchParams.get("deliveryStatus");
  const [filters, setFilters] = useState({
    delivered: deliveryStatus === "true",
    inProcces: deliveryStatus === "false",
  });

  // const [editingProductId, setEditingProductId] = useState("");
  const [editingFields, setEditingFields] = useState({});
  const [editableValues, setEditableValues] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  

  const queryClient = useQueryClient();

  const { mutate: updateProduct } = useMutation({
    mutationFn: (updatedData) => {
      return httpRequest.patch(
        `/api/products/${updatedData.id}`,
        updatedData.updatedProduct
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const handleEditClick = (item, field) => {
    // برای ذخیره فیلد در حال ویرایش
    setEditingFields((prev) => ({
      ...prev,
      [item._id]: {
        ...prev[item._id],
        [field]: true,
      },
    }));

    setEditableValues((prev) => ({
      ...prev,
      [item._id]: {
        ...prev[item._id],
        [field]: item[field],
      },
    }));
    setOriginalValues((prev) => ({
      ...prev,
      [item._id]: {
        ...prev[item._id],
        [field]: item[field],
      },
    }));
    setIsSaveEnabled(true);
  };

  const handleInputChange = (e, productId, field) => {
    const { value } = e.target;
    setEditableValues((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleKeyDown = (e, productId, field) => {
    if (e.key === "Enter") {
      // ذخیره کردن مقادیر ویرایش شده
      Object.keys(editableValues).forEach((productId) => {
        const updatedProduct = editableValues[productId];
        updateProduct({
          id: productId,
          updatedProduct,
        });
      });
      
      // خارج شدن از حالت ویرایش برای همه سلول‌ها
      setEditingFields({ productId: null, field: null });
      setIsSaveEnabled(false);
    } else if (e.key === "Escape") {
      // لغو ویرایش
      setEditingFields({ productId: null, field: null });
    }
  };
  



  const handleSave = () => {
    // console.log("Saving values:", editableValues);

    Object.keys(editableValues).forEach((productId) => {
      const updatedProduct = editableValues[productId];
      updateProduct({ id: productId, updatedProduct });
    });
    // بعد از ذخیره کردن، فیلدهای در حال ویرایش را غیر فعال کن
  setEditingFields({});
  setIsSaveEnabled(false);
    
  };

  const openAddProductModal = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const openEditProductModal = (product) => {
    console.log(product);
    setIsEditMode(true);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // useEffect(() => {
  //   if (selectedProduct) {
  //     console.log(selectedProduct);
  //   }
  // }, [selectedProduct]);

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
      let newFilters = { delivered: false, inProcces: false };

      if (filter === "delivered") {
        newFilters.delivered = true;
        setSearchParams({ deliveryStatus: "true" });
      } else if (filter === "inProcces") {
        newFilters.inProcces = true;
        setSearchParams({ deliveryStatus: "false" });
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
    if (activeTab !== "orders") {
      searchParams.delete("deliveryStatus");
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);

  // const openModal = () =>{
  //   console.log("modal open");
  //   setIsModalOpen(true);

  // }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteVal(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    mutate(deleteVal, {
      onSuccess: () => {
        console.log(" deleted ");
        qc.invalidateQueries({ queryKey: ["products"] });
        setDeleteModal(false);
      },
    });
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  const handleShowStatusModal = (order) => {
    setSelectedOrder(order);
    // setSelectedCustomer(customer);
    setStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setStatusModal(false);
    // setSelectedOrder(null); // خالی کردن اطلاعات سفارش
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
    Cookies.remove("accessToken");
    navigate("/admin-login");
  };

  // console.log(selectedOrder);
  return (
    <div className="p-6">
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          colorScheme="teal"
          variant="outline"
          m={3}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Link to={"/"}>
          <Button colorScheme="teal" variant="outline" m={3}>
            Back to Home
          </Button>
        </Link>
      </Box>
      <Tabs
        variant="enclosed"
        onChange={(index) =>
          setActiveTab(
            index === 0 ? "products" : index === 1 ? "instock" : "orders"
          )
        }
      >
        <TabList>
          <Tab>Products</Tab>
          <Tab>In stock</Tab>
          <Tab>Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Button
              colorScheme="teal"
              variant="outline"
              m={10}
              onClick={openAddProductModal}
            >
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
                        <CiEdit
                          className="text-2xl"
                          onClick={() => openEditProductModal(item)}
                        />
                        <MdOutlineDeleteOutline
                          className="text-2xl"
                          onClick={() => handleShowDeleteModal(item._id)}
                        />
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

            {productsData?.total && (
              <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </TabPanel>
          <TabPanel>
            <Button
              colorScheme="teal"
              variant="outline"
              m={10}
              onClick={handleSave}
            >
              save
            </Button>

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
            <Tr key={item._id}>
              <Td>{item.slugname}</Td>
              <Td>
                {editingFields[item._id]?.price ? (
                  <Input
                    name="price"
                    value={editableValues[item._id]?.price || ""}
                    onChange={(e) => handleInputChange(e, item._id, "price")}
                    onKeyDown={(e) => handleKeyDown(e, item._id, "price")}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEditClick(item, "price")}>{item.price}$</span>
                )}
              </Td>
              <Td>
                {editingFields[item._id]?.quantity ? (
                  <Input
                    name="quantity"
                    value={editableValues[item._id]?.quantity || ""}
                    onChange={(e) => handleInputChange(e, item._id, "quantity")}
                    onKeyDown={(e) => handleKeyDown(e, item._id, "quantity")}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleEditClick(item, "quantity")}>{item.quantity}</span>
                )}
              </Td>
            </Tr>
          ))}
              </Tbody>
            </Table>
            {productsData?.total && (
              <Pagination
                totalItems={productsData?.total}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
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
              <RadioGroup>
                <Stack spacing={5} direction="row">
                  <Radio value="all" onChange={() => handleFilterChange("all")}>
                    All
                  </Radio>
                  <Radio
                    value="delivered"
                    isChecked={filters.delivered}
                    onChange={() => handleFilterChange("delivered")}
                  >
                    Delivered
                  </Radio>
                  <Radio
                    value="inProcces"
                    isChecked={filters.inProcces}
                    onChange={() => handleFilterChange("inProcces")}
                  >
                    In Process
                  </Radio>
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
                  <Th>Check the order</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders &&
                  filteredOrders.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        {item.user.firstname} {item.user.lastname}
                      </Td>
                      <Td>{item.totalPrice}$</Td>
                      <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                      <Td>{item.deliveryStatus ? "Delivered" : "inProcces"}</Td>
                      <Td>
                        <Link onClick={() => handleShowStatusModal(item)}>
                          Check
                        </Link>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {activeTab === "orders" && (
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

      <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        isEditMode={isEditMode}
      />
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-14 rounded-2xl shadow-lg flex flex-col gap-4">
            <h2>Are you sure you want to delete this product?</h2>
            <div className="flex flex-row justify-around">
              <button
                className="bg-slate-800 text-white px-3 py-2 rounded-md m-2 cursor-pointer"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* status Modal */}

      {statusModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-14 rounded-2xl shadow-lg flex flex-col gap-4 w-2/3">
            <h2>Status</h2>
            <div className="flex flex-col justify-around gap-4 font-medium text-lg">
              <div>
                <b>Customer name</b> : {selectedOrder.user.firstname}{" "}
                {selectedOrder.user.lastname}
              </div>
              <div>
                <b>Customer Address </b>: {selectedOrder.user.address}
              </div>
              <div>
                <b>Customer phone number</b> : {selectedOrder.user.phoneNumber}
              </div>
              <div>
                <b>order time</b> :{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </div>
              <div>
                <b>deliver time</b> :{" "}
                {selectedOrder.deliveryTime
                  ? new Date(selectedOrder.deliveryTime).toLocaleDateString()
                  : "Not delivered yet"}
              </div>
              
                <table className="w-full mt-4 border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Product Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Quantity
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <tbody>
  {selectedOrder.items && selectedOrder.items.length > 0 ? (
    selectedOrder.items.map((item, index) => (
      <tr key={index}>
        <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
        <td className="border border-gray-300 px-4 py-2">${item.price}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-4">No items found</td>
    </tr>
  )}
</tbody>

                  </tbody>
                </table>
                <div className="flex flex-row justify-evenly">
                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">
                  Delivered
                </button>
                <button
                  className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                  onClick={handleCloseStatusModal}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
