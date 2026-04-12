
import React from 'react'
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { useFormik } from 'formik';


const CreateServiceForm = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            discription: "",
            price: "",
            duration: "",
            category: ""
        },
        onSubmit: () => {
            console.log("submitted", formik.values);
        }
    })

    return (
        <div className='flex justify-center items-center'>
            <form onSubmit={formik.handleSubmit} className='space-y-5 w-full lg:w-1/2 p-5 '>
                <Grid container spacing={2}>
                    <Grid className="w-24 height-24" size={{ xs: 12 }} >
                        {false ? <div className='relative border '>
                            <img className='w-24 h-24 object-cover' src='https://t3.ftcdn.net/jpg/05/06/74/32/360_F_506743235_coW6QAlhxlBWjnRk0VNsHqaXGGH9F4JS.jpg' alt="" />
                            <IconButton className='' color='error' size='small'
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,

                                }}>
                                <Close sx={{ fontSize: "1rem" }} />
                            </IconButton>
                        </div> : <>
                            <input type="file" accept='image/' id='fileInput' style={{ display: "none" }} />
                            <label className='relative ' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400'>
                                    <AddPhotoAlternate className='text-gray-700' />
                                </span>
                                {false && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center '>
                                    <CircularProgress />
                                </div>}
                            </label>
                        </>}

                    </Grid>

                    <Grid size={12}>
                        <TextField
                            fullWidth
                            id='name'
                            name='name'
                            label="name" required
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
                            id='discription'
                            name='discription'
                            label="discription"
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
                            label="price"
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
                            label="duration"
                            required
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                        >
                        </TextField>
                    </Grid>


                    <Grid size={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.category}
                                label="Category"
                                name='category'
                                onChange={formik.handleChange}
                            >
                                {[1, 1, 1, 1].map((item) => <MenuItem value={"haircut"}>Hair Cut</MenuItem>)}


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