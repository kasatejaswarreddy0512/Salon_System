import React from 'react'
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview } from 'src/Redux/Review/action';

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const { review } = useSelector(store => store);
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            reviewText: '',
            rating: 0
        },
        onSubmit: (values) => {
            console.log("submitting values:", values);
            dispatch(createReview({
                salonId: id,
                jwt: localStorage.getItem("jwt"),
                reviewData: values,
            }))
        }
    });

    return (
        <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{ mt: 2, mb: 2 }}
            className='space-y-4 w-full lg:w-1/2'
        >
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

            <div className='space-y-2'>
                <InputLabel>Rating</InputLabel>
                <Rating
                    id="rating"
                    name="rating"
                    value={formik.values.rating}
                    precision={0.5}
                    max={5}
                    onChange={(event, newValue) =>
                        formik.setFieldValue('rating', newValue)
                    }
                />
            </div>

            <Button variant="contained" color="primary" type="submit">
                Submit Review
            </Button>
        </Box>
    )
}

export default CreateReviewForm;