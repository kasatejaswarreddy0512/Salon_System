import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSalon } from 'src/Redux/Salon/action';
import OwnerDetailForm from './OwnerDetailForm';
import SalonAddressForm from './SalonAddressForm';
import SalonDetailsForm from './SalonDetailsForm';

const steps = ['Owner Details', 'Salon Details', 'Salon Address'];

const getLocalTime = (time) => {
    if (!time) return null;

    const hour = time?.$H ?? 0;
    const minute = time?.$m ?? 0;
    const second = time?.$s ?? 0;

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0'
    )}:${String(second).padStart(2, '0')}`;
};

const SalonAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleActiveStep = (value) => {
        setActiveStep((prev) => prev + value);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            fullName: '',
            password: '',
            salonAddress: {
                phoneNumber: '',
                address: '',
                city: '',
                email: '',
            },
            salonDetails: {
                name: '',
                openTime: null,
                closeTime: null,
                images: [],
            },
        },
        onSubmit: (values) => {
            console.log('Formik:', values);

            const openingTime = getLocalTime(values.salonDetails.openTime);
            const closingTime = getLocalTime(values.salonDetails.closeTime);

            const ownerDetails = {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                role: 'SALON_OWNER',
                username: values.email ? values.email.split('@')[0] : '',
            };

            const salonDetails = {
                name: values.salonDetails.name,
                images: values.salonDetails.images,
                openingTime,
                closingTime,
                address: values.salonAddress.address,
                city: values.salonAddress.city,
                phoneNumber: values.salonAddress.phoneNumber,
                email: values.salonAddress.email,
            };

            console.log('ownerDetails =>', ownerDetails);
            console.log('salonDetails =>', salonDetails);

            dispatch(createSalon({ salonDetails, ownerDetails, navigate }));
        },
    });

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((item) => (
                    <Step key={item}>
                        <StepLabel>{item}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <div className="mt-20 space-y-10">
                <div>
                    {activeStep === 0 ? (
                        <OwnerDetailForm formik={formik} />
                    ) : activeStep === 1 ? (
                        <SalonDetailsForm formik={formik} />
                    ) : (
                        <SalonAddressForm formik={formik} />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        disabled={activeStep < 1}
                        onClick={() => handleActiveStep(-1)}
                        variant="contained"
                    >
                        Back
                    </Button>

                    <Button
                        onClick={
                            activeStep === 2
                                ? formik.handleSubmit
                                : () => handleActiveStep(1)
                        }
                        variant="contained"
                    >
                        {activeStep === 2 ? 'Create Account' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SalonAccountForm;