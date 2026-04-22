




import React, { useEffect } from 'react'
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { uploadToCloudnary } from 'src/util/uploadToCloudnary';
import { createService } from 'src/Redux/SalonService/action';
import { store } from 'src/Redux/Store';
import { getCategoriesBySalon } from 'src/Redux/Category/action';


const CreateServiceForm = () => {

    const dispatch = useDispatch();
    const { category, salon } = useSelector(store => store)
    const [uploadImage, setUploadImage] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            description: "",
            price: "",
            duration: "",
            categoryId: ""
        },
        onSubmit: (values) => {

            console.log("submitted", formik.values);

            dispatch(createService({
                service: values,
                jwt: localStorage.getItem("jwt")
            }))


        }
    })


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

    useEffect(() => {
        if (salon.salon) {
            dispatch(getCategoriesBySalon({
                jwt: localStorage.getItem("jwt"),
                salonId: salon?.salon?.id
            }))
        }
    }, [salon.salon])

    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form onSubmit={formik.handleSubmit} className='w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6'>

                <h2 className='text-xl font-semibold text-gray-700 text-center'>
                    Add Service
                </h2>
                <Grid container spacing={2}>
                    <Grid className="w-24 height-24" size={{ xs: 12 }} >
                        {formik.values.image ?
                            <div className='relative border '>
                                <img className='w-24 h-24 object-cover' src={formik.values.image} alt="" />
                                <IconButton className='' color='error' size='small'
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,

                                    }}>
                                    <Close sx={{ fontSize: "1rem" }} />
                                </IconButton>
                            </div> :
                            <>
                                <input
                                    type="file"
                                    accept='image/*'
                                    id='fileInput'
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                                <label className='relative ' htmlFor='fileInput'>
                                    <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                                        <AddPhotoAlternate className='text-gray-700' />
                                    </span>
                                    {uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center '>
                                        <CircularProgress />
                                    </div>}
                                </label>
                            </>
                        }

                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            id='name'
                            name='name'
                            label="Name" required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        >
                        </TextField>
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id='description'
                            name='description'
                            label="Discription"
                            required
                            value={formik.values.discription}
                            onChange={formik.handleChange}
                        >
                        </TextField>
                    </Grid>


                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            id='price'
                            name='price'
                            label="Price"
                            required
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        >
                        </TextField>
                    </Grid>


                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            id='duration'
                            name='duration'
                            label="Duration"
                            required
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                        >
                        </TextField>
                    </Grid>


                    <Grid size={12}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="categoryId"
                                name="categoryId"
                                value={formik.values.categoryId || ""}
                                label="Category"
                                onChange={formik.handleChange}
                            >
                                {category?.categories?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid size={12}>
                        <Button
                            type='submit'
                            variant='outlined'
                            fullWidth
                            sx={{ py: '.8rem' }}
                        >
                            Create Category
                        </Button>
                    </Grid>

                </Grid>

            </form>

        </div>
    )
}

export default CreateServiceForm;
