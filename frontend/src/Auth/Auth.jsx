import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignForm from './SignupForm';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* 🎥 Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://booksy-public.s3.amazonaws.com/horizontal_.webm" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* 🌑 Dark Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

            {/* 📦 Form Container */}
            <div className="relative z-20 flex justify-center items-center h-full">
                <div className="shadow-lg p-6 bg-white/90 backdrop-blur-md rounded-xl w-[450px]">

                    {location.pathname === "/register" ? (
                        <>
                            <SignForm />
                            <div className='text-center p-5'>
                                Already have account ?
                                <Button onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <LoginForm />
                            <div className='text-center p-5'>
                                You don't have account ?
                                <Button onClick={() => navigate("/register")}>
                                    Register
                                </Button>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </div>
    );
};

export default Auth;

