import React, { useState } from 'react';
import { MdOutlineClose, MdOutlineFileUpload, MdDeleteOutline } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
    const [data, setData] = useState({
        // _id: "66697cad09b28500f18927c5", // Ensure _id is included for updates
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    });
    const [uploadProductImageInput, setUploadProductImageInput] = useState();
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        setUploadProductImageInput(file.name);
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };
    
    const handleSubmit = async (e) => {
        console.log("hello");
        e.preventDefault();
        console.log("hello");
        console.log("data", data);
    

        const url = data._id ? SummaryApi.updateProduct.url : SummaryApi.uploadProduct.url;
        const method = data._id ? SummaryApi.updateProduct.method : SummaryApi.uploadProduct.method;
    
        try {
            const response = await fetch(url, {
                method: method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                throw new Error(errorData.message || "Something went wrong");
            }
    
            const responseData = await response.json();
    
            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchData();
            } else {
                toast.error(responseData.message);
            }
        } catch (err) {
            // Handle fetch and JSON errors
            toast.error(err.message || "An error occurred while submitting the form");
        }
    };
    

    return (
        <div className='fixed top-0 left-0 bg-slate-200 bg-opacity-50 right-0 bottom-0 w-full h-full flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-orange-500' onClick={onClose}>
                        <MdOutlineClose />
                    </div>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        required
                        className='p-1 bg-slate-100 border rounded'
                    />

                    <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        required
                        className='p-1 bg-slate-100 border rounded'
                    />

                    <label htmlFor='category' className='mt-3'>Category:</label>
                    <select
                        required
                        value={data.category}
                        name='category'
                        onChange={handleOnChange}
                        className='p-1 bg-slate-100 border rounded'
                    >
                        <option value={""}>Select Category</option>
                        {productCategory.map((element, index) => (
                            <option value={element.value} key={element.value + index}>{element.label}</option>
                        ))}
                    </select>

                    <label htmlFor='productImage' className='mt-3'>Product Image:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><MdOutlineFileUpload /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2 '>
                                {data.productImage.map((element, index) => (
                                    <div className='relative group' key={index}>
                                        <img
                                            src={element}
                                            alt={`product-${index}`}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(element);
                                            }}
                                        />
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-orange-500 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDeleteOutline />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-orange-500 text-xs'>Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor='price'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        required
                        className='p-1 bg-slate-100 border rounded'
                    />

                    <label htmlFor='sellingPrice'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter selling price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        required
                        className='p-1 bg-slate-100 border rounded'
                    />

                    <label htmlFor='description'>Description :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter product description'
                        rows={3}
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                    />

                    <button className='px-3 py-1 bg-orange-500 text-white mb-10 rounded hover:bg-orange-600'>
                        Upload Product
                    </button>
                </form>
            </div>
            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default UploadProduct;
