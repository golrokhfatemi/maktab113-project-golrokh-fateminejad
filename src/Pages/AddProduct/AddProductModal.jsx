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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "../../Components/TextInput";
import SelectInput from "../../Components/SelectInput";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const options = [
  { value: "1", label: " 1" },
  { value: "2", label: " 2" },
];
export  function AddProduct() {
  const {mutate} = useCreateProduct()}


const AddProductModal = ({ isOpen, onClose }) => {
  const { mutate } = useCreateProduct();
  const [description, setDescription] = useState("");
  //   const dispatch = useDispatch();

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
    console.log(description);
  };

  
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      price: "",
      quantity: "",
      discount: "",
      description: "",
      brand: "",
      thumbnail: "",
      image: "",
    },
  });

  const onSubmitForm = (values) => {
    console.log(values);
    console.log("hi");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("discount", values.discount);
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    formData.append("thumbnail", values.thumbnail[0]);
    formData.append("image", values.image[0]);

    console.log(values.upload_images[0]);
    console.log(values.upload_images);
    console.log(formData.get("upload_images"));
    console.log("Before mutate:", formData);
    mutate(formData);
    // navigate("/")
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
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

                <SelectInput
                  label={" Category of product"}
                  name={"category"}
                  register={register("category", {
                    required: {
                      value: true,
                      message: " Please enter the category of course ",
                    },
                  })}
                  options={options}
                  errors={errors}
                  
                />

                <SelectInput
                  label={" subcategory of product"}
                  name={"subcategory"}
                  register={register("subcategory", {
                    required: {
                      value: true,
                      message: " Please enter the product subcategory ",
                    },
                  })}
                  options={options}
                  errors={errors}
                />

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
                  lable={"  Price "}
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

                    maxLength: {
                      value: 5,
                      message: "At last 5 characture",
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
                    data="<p>Enter product description here...</p>"
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
                    name="upload_images"
                    accept="image/*"
                    {...register("upload_images")}
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
                    name="upload_images"
                    accept="image/*"
                    {...register("upload_images")}
                  />
                  {errors.image && (
                    <p className="text-red-600 text-sm  ">
                      {errors.image.message}
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


