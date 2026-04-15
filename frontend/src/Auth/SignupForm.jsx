import { Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'

const SignForm = () => {

    const formik = useFormik(
        {
            initialValues: {
                fullName: "",
                email: "",
                password: "",
                role: "CUSTOMER"
            },
            onSubmit: (values) => {
                console.log("Submitted ", values);
            }
        }
    );

    return (
        <Container component={"main"} maxWidth="xs">
            <div className='space-y-5'>
                <Typography className='text-center' variant='h5'>
                    Signup
                </Typography>

                <form className='space-y-5' onSubmit={formik.handleSubmit}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        name='fullName'
                        id='fullName'
                        label="Enter Full Name"
                        onChange={formik.handleChange}
                        value={formik.values.fullName}
                        required
                    />
                    <TextField
                        variant='outlined'
                        fullWidth
                        name='email'
                        id='email'
                        label="Enter Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                    />
                    <TextField
                        variant='outlined'
                        fullWidth
                        name='password'
                        id='password'
                        label="Enter password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                    <Button sx={{ py: '.7rem' }} fullWidth variant='contained' type='submit'>
                        Register
                    </Button>

                </form>

            </div>
        </Container>
    )
}

export default SignForm;
