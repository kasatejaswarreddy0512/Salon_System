import { Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const SalonAddressForm = ({ formik }) => {
    return (
        <Container component="main" maxWidth="xs">
            <div className="space-y-5">
                <Typography className="text-center" variant="h5">
                    Salon Address
                </Typography>

                <form onSubmit={formik.handleSubmit} className="w-full">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="salonAddress.address"
                                name="salonAddress.address"
                                label="Address"
                                required
                                value={formik.values.salonAddress.address}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="salonAddress.email"
                                name="salonAddress.email"
                                label="Salon Email"
                                type="email"
                                required
                                value={formik.values.salonAddress.email}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="salonAddress.phoneNumber"
                                name="salonAddress.phoneNumber"
                                label="Phone Number"
                                required
                                value={formik.values.salonAddress.phoneNumber}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="salonAddress.city"
                                name="salonAddress.city"
                                label="City"
                                required
                                value={formik.values.salonAddress.city}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="salonAddress.pincode"
                                name="salonAddress.pincode"
                                label="Pincode"
                                required
                                value={formik.values.salonAddress.pincode}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SalonAddressForm;