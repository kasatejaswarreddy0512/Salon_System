import React, { useState } from 'react';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import {
    CircularProgress,
    Container,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { uploadToCloudnary } from 'src/util/uploadToCloudnary';

const SalonDetailsForm = ({ formik }) => {
    const [uploadImage, setUploadImage] = useState(false);

    const handleImageChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadImage(true);

        try {
            const image = await uploadToCloudnary(file);

            if (image) {
                formik.setFieldValue('salonDetails.images', [
                    ...formik.values.salonDetails.images,
                    image,
                ]);
            }
        } catch (error) {
            console.log('Image upload error:', error);
        } finally {
            setUploadImage(false);
        }
    };

    const handleRemoveImage = (index) => () => {
        const updatedImages = [...formik.values.salonDetails.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue('salonDetails.images', updatedImages);
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className="space-y-5">
                <Typography className="text-center" variant="h5">
                    Salon Details
                </Typography>

                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div className="flex gap-3 flex-wrap">
                        {formik.values.salonDetails.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative border rounded-md overflow-hidden"
                            >
                                <img
                                    className="w-24 h-24 object-cover"
                                    src={image}
                                    alt={`salon-${index}`}
                                />
                                <IconButton
                                    onClick={handleRemoveImage(index)}
                                    color="error"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <Close sx={{ fontSize: '1rem' }} />
                                </IconButton>
                            </div>
                        ))}

                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />

                            <label htmlFor="fileInput">
                                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                                    <AddPhotoAlternate className="text-gray-700" />
                                </span>
                            </label>

                            {uploadImage && (
                                <div className="absolute inset-0 w-24 h-24 flex justify-center items-center bg-white/70">
                                    <CircularProgress size={24} />
                                </div>
                            )}
                        </div>
                    </div>

                    <TextField
                        variant="outlined"
                        fullWidth
                        name="salonDetails.name"
                        id="salon-name"
                        label="Enter Salon Name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.salonDetails.name}
                        required
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <>
                            <TimePicker
                                sx={{ width: '100%' }}
                                label="Select Open Time"
                                value={formik.values.salonDetails.openTime}
                                onChange={(value) =>
                                    formik.setFieldValue('salonDetails.openTime', value)
                                }
                            />

                            <TimePicker
                                sx={{ width: '100%', mt: 2 }}
                                label="Select Close Time"
                                value={formik.values.salonDetails.closeTime}
                                onChange={(value) =>
                                    formik.setFieldValue('salonDetails.closeTime', value)
                                }
                            />
                        </>
                    </LocalizationProvider>
                </form>
            </div>
        </Container>
    );
};

export default SalonDetailsForm;