import React from 'react'
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

const CreateReviewForm = () => {


    const formik = useFormik({
        initialValues: {
            reviewText: '',
            reviewRating: 0
        },
        onSubmit: (values) => {
            console.log("submitting values:", values);
        }
    });


    return (

        <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{ mt: 2, mb: 2 }}
            className='space-y-4 w-full lg:w-1/2  '>


            <TextField
                fullWidth
                id="reviewText"
                label="Review Text"
                name="reviewText"
                multiline
                rows={4}
                value={formik.values.reviewText}
                onChange={formik.handleChange}
            />

            <div className='space-y-2 '>
                <InputLabel>Rating</InputLabel>
                <Rating
                    id="reviewRating"
                    name="reviewRating"
                    value={formik.values.reviewRating}
                    precision={0.5}
                    defaultValue={0}
                    max={5}
                    onChange={(event, newValue) => formik.setFieldValue('reviewRating', newValue)}
                />
            </div>

            <Button variant="contained" color="primary" type="submit">
                Submit Review
            </Button>

        </Box>
    )
}

export default CreateReviewForm;