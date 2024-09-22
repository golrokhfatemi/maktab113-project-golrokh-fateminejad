import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import useCreateProduct from "../../Hook/useCreateProduct";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "../../Components/TextInput";
import SelectInput from "../../Components/SelectInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import httpRequest from "../../Services/http-request";
import { useMutation, useQueryClient } from "react-query";
import useEditProduct from "../../Hook/useEditProduct";

const AddProductModal = ({ isOpen, onClose, product, isEditMode }) => {
  const queryClient = useQueryClient();
  const { mutate } = useCreateProduct({});

  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubCategories] = useState([]);
  const { mutate: editProduct } = useEditProduct();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    quantity: "",
    discount: "",
    brand: "",
    description: "",
    thumbnail: "",
    image: "",
  });

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
    setValue("description", data);
  };

  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      price: "",
      quantity: "",
      discount: "",
      brand: "",
      thumbnail: "",
      image: "",
    },
  });
  // console.log(errors);
  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpRequest.get("/api/categories");

        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await httpRequest.get("/api/subcategories");
        setSubCategories(response.data.data.subcategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredSubs = subcategories.filter(
        (subcategory) => subcategory.category === selectedCategory
      );
      setFilteredSubCategories(filteredSubs);
    } else {
      setFilteredSubCategories([]);
    }
  }, [selectedCategory, subcategories]);

  // const handleCategoryChange = (e) => {
  //   const categoryId = e.target.value;

  //   console.log(categoryId);
  //   console.log("hi");

  //   setSelectedCategory(categoryId);
  // };

  const onSubmitForm = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("brand", values.brand);
    formData.append("discount", values.discount);
    formData.append("description", description);

    if (values.thumbnail && values.thumbnail[0]) {
      formData.append("thumbnail", values.thumbnail[0]);
    }

    if (values.images && values.images.length > 0) {
      for (let i = 0; i < values.images.length; i++) {
        formData.append(`images`, values.images[i]);
      }
    }

    // formData.append("thumbnail", values.thumbnail[0]);
    // for(const key in values.images){
    //   if(values.images.hasOwnProperty(key)){
    //     formData.append(`images`,values.images[key])
    //   }
    // }
    // formData.append("images", values.images[0]);
    // console.log(formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    mutate(formData, {
      onSuccess: () => {
        // console.log("hi");

        queryClient.invalidateQueries("products");
        onClose();
      },
    });
  };

  useEffect(() => {
    if (isEditMode && product) {
      setValue("name", product.name);
      setValue("category", product.category.name);
      console.log(product.category.name);
      setValue("subcategory", product.subcategory.name);
      console.log(product.subcategory.name);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("discount", product.discount);
      setValue("description", description);
      setValue("brand", product.brand);
      setValue("thumbnail", product.thumbnail);
      setValue("image", product.images);
    }
  }, [isEditMode, product, setValue,description]);

  // set description in edit mode
  useEffect(() => {
    if (isEditMode && product) {
      setDescription(product.description);
      setValue("description", product.description);
    }
  }, [isEditMode, product, setValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const AddCategory = () => {
  //   const qc = useQueryClient();
  //   const { mutate } = useMutation({
  //     mutationFn: async (data) => {
  //       await httpRequest.post("/api/categories", data);
  //     },
  //     mutationKey: ["addCategory"],
  //   });
  // };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-row justify-center ">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <TextInput
                lable={"Product name"}
                name={"name"}
                register={register("name", {
                  required: {
                    value: true,
                    message: "   Please Enter product name  ",
                  },

                  minLength: {
                    value: 3,
                    message: "At Least 3 characture",
                  },
                })}
                errors={errors}
              />
              {/* <p className='text-red-600 '>{errors.name?.message}</p> */}

              {/* <TextInput
              lable={" Category"}
              name={"category"}
              register={register("category", {
                required: {
                  value: true,
                  message: " Please Enter product category",
                },

                minLength: {
                  value: 3,
                  message: "At Least 3 charactur ",
                },
              })}
              errors={errors}
              /> */}

              <div className="flex flex-row gap-4 items-center">
                <SelectInput
                  label={"Category of product"}
                  name={"category"}
                  register={register("category", {
                    required: {
                      value: true,
                      message: " Please enter the category of course ",
                    },
                  })}
                  options={categories?.map((category) => ({
                    value: category._id,
                    label: category.name,
                  }))}
                  errors={errors}
                  // onChange={(e) => {
                  //   const categoryId = e.target.value;
                  //   setSelectedCategory(categoryId);
                  //   setValue("category", categoryId);
                  //   trigger("category");
                  // }}
                />
                <input className="shadow  rounded-md h-10"></input>
                <Button className="felx justify-center items-center ">
                  Add Category
                </Button>
              </div>

              <div className="flex flex-row gap-4 justify-center items-center">
                <SelectInput
                  label={" subcategory of product"}
                  name={"subcategory"}
                  register={register("subcategory", {
                    required: {
                      value: true,
                      message: " Please enter the product subcategory ",
                    },
                  })}
                  options={filteredSubcategories?.map((subcategory) => ({
                    value: subcategory._id,
                    label: subcategory.name,
                  }))}
                  errors={errors}
                />
                <input className="shadow  rounded-md h-10"></input>
                <Button className="felx justify-center items-center ">
                  Add SubCategory
                </Button>
              </div>

              <TextInput
                lable={"quantity"}
                name={"quantity"}
                register={register("quantity", {
                  required: {
                    value: true,
                    message: "Please enter product quantity",
                  },
                })}
                errors={errors}
                type={"number"}
              />

              <TextInput
                lable={"Price"}
                name={"price"}
                register={register("price", {
                  required: {
                    value: true,
                    message: "Please enter price of the course",
                  },
                })}
                type={"number"}
                errors={errors}
              />

              <TextInput
                lable={"brand"}
                name={"brand"}
                register={register("brand", {
                  required: {
                    value: true,
                    message: "Please enter the product brand",
                  },
                })}
                type={"string"}
                errors={errors}
              />

              <TextInput
                lable={"discount"}
                name={"discount"}
                register={register("discount", {
                  required: {
                    value: true,
                    message: "Please enter the product discount",
                  },

                  maxLength: {
                    value: 3,
                    message: "At last 3 characture",
                  },
                })}
                type={"number"}
                errors={errors}
              />
              <div style={{ width: "100%" }}>
                <label className="text-sm font-bold">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="m-5 w-full flex flex-row justify-start items-center ">
                <div className="px-8">
                  <label
                    className="block text-gray-700 text-sm font-bold text-center  "
                    htmlFor="image"
                  >
                    Thumbnail:{" "}
                  </label>
                </div>

                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  {...register("thumbnail")}
                />
                {errors.image && (
                  <p className="text-red-600 text-sm  ">
                    {errors.image.message}
                  </p>
                )}
              </div>

              <div className="m-5 w-full flex flex-row justify-start items-center ">
                <div className="px-8">
                  <label
                    className="block text-gray-700 text-sm font-bold text-center  "
                    htmlFor="image"
                  >
                    Image:{" "}
                  </label>
                </div>

                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  {...register("images")}
                />
                {errors.images && (
                  <p className="text-red-600 text-sm  ">
                    {errors.images.message}
                  </p>
                )}
              </div>

              <div className="flex justify-around mt-10">
                <Button type="submit">submit</Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
