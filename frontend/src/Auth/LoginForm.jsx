import { Button, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from 'src/Redux/Auth/action'

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik(
        {
            initialValues: {
                email: "",
                password: ""
            },
            onSubmit: (values) => {
                console.log("Submitted ", values);
                dispatch(loginUser({ email: values.email, password: values.password, navigate }))
            }
        }
    );

    return (
        <Container component={"main"} maxWidth="xs">
            <div className='space-y-5'>
                <Typography className='text-center' variant='h5'>
                    Login
                </Typography>

                <form className='space-y-5' onSubmit={formik.handleSubmit}>
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
                        Login
                    </Button>

                </form>

            </div>
        </Container>
    )
}

export default LoginForm
