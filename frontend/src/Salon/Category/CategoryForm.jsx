import React, { useState } from 'react'
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { uploadToCloudnary } from 'src/util/uploadToCloudnary';
import { createCategory } from 'src/Redux/Category/action';

const CategoryForm = () => {
    const dispatch = useDispatch();
    const [uploadImage, setUploadImage] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            image: ""
        },
        onSubmit: (values) => {
            dispatch(createCategory({
                category: values,
                jwt: localStorage.getItem("jwt")
            }));
        }
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadImage(true);

        const image = await uploadToCloudnary(file);

        if (image) {
            formik.setFieldValue("image", image);
        }

        setUploadImage(false);
    };

    return (
        <div className='flex justify-center items-center min-h-[70vh] bg-gray-50'>
            <form
                onSubmit={formik.handleSubmit}
                className='w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6'
            >
                <h2 className='text-xl font-semibold text-gray-700 text-center'>
                    Create Category
                </h2>

                {/* Image Upload */}
                <div className='flex justify-center'>
                    {formik.values.image ? (
                        <div className='relative'>
                            <img
                                src={formik.values.image}
                                alt="Category"
                                className='w-28 h-28 object-cover rounded-lg border'
                            />

                            <IconButton
                                size='small'
                                color='error'
                                onClick={() => formik.setFieldValue("image", "")}
                                className='!absolute !top-1 !right-1 bg-white shadow'
                            >
                                <Close fontSize="small" />
                            </IconButton>
                        </div>
                    ) : (
                        <label
                            htmlFor='fileInput'
                            className='w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition'
                        >
                            <AddPhotoAlternate className='text-gray-500' />

                            {uploadImage && (
                                <div className='absolute'>
                                    <CircularProgress size={30} />
                                </div>
                            )}
                        </label>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        id='fileInput'
                        hidden
                        onChange={handleImageChange}
                    />
                </div>

                {/* Category Name */}
                <TextField
                    fullWidth
                    id='name'
                    name='name'
                    label="Category Name"
                    variant="outlined"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />

                {/* Submit Button */}
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={uploadImage}
                    sx={{
                        py: ".8rem",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "8px"
                    }}
                >
                    {uploadImage ? "Uploading..." : "Create Category"}
                </Button>
            </form>
        </div>
    );
};

export default CategoryForm;