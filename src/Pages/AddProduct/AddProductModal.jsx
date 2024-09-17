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
import { useEffect, useState } from "react";
import httpRequest from "../../Services/http-request";
import { useMutation, useQueryClient } from "react-query";




const AddProductModal = ({ isOpen, onClose }) => {
  const { mutate } = useCreateProduct();
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]); 
  const [subcategories, setSubCategories] = useState([]); 
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


  const onSubmitForm = (values) => {
    console.log(values);
    

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("brand", values.brand);
    formData.append("discount", values.discount);
    formData.append("description", values.description);
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
    console.log(formData);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
  }
    
    // console.log(values.image[0]);
    // console.log(values.thumbnail);
    // console.log(formData.get("upload_images"));
    // console.log("Before mutate:", formData);
    mutate(formData);
    // navigate("/")
  };

  const AddCategory = () => {
    const qc = useQueryClient()
    const {mutate} = useMutation({
      mutationFn : async(data) => {
        await httpRequest.post('/api/categories' , data)
        
      },
      mutationKey: ["addCategory"]
    })
  }
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
                  
                />
                <input className="shadow  rounded-md h-10"></input>
                <Button className="felx justify-center items-center ">Add Category</Button>
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
                  options={subcategories?.map((subcategories) => ({
                    value: subcategories._id, 
                    label: subcategories.name,
                  }))}
                  errors={errors}
                />
                <input className="shadow  rounded-md h-10"></input>
                <Button className="felx justify-center items-center ">Add SubCategory</Button>
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


