import { Container, TextField, Typography } from '@mui/material';
import React from 'react'

const OwnerDetailForm = ({ formik }) => {



    return (
        <Container component={"main"} maxWidth="xs">
            <div className='space-y-5'>
                <Typography className='text-center' variant='h5'>
                    Owner Details
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
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                </form>
            </div>
        </Container>
    )
}

export default OwnerDetailForm;
