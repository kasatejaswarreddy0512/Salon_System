import { Button } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignForm from './SignupForm';

const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center h-[95vh]'>
            <div className='shadow-lg p-5 '>
                {location.pathname === "/register" ? (
                    <>
                        <SignForm />
                        <div className='text-center p-5'>
                            Already have account ? <Button onClick={() => navigate("/login")}>Login</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <LoginForm />
                        <div className='text-center p-5'>
                            You don't have account ? <Button onClick={() => navigate("/register")}>register</Button>
                        </div>
                    </>

                )}
            </div>
        </div>
    )
}

export default Auth;
