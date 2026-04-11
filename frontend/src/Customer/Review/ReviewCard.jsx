import React from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";

const ReviewCard = () => {
    return (
        <div className="w-full justify-between ">
            <div className="w-[90%] mx-auto">
                <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    className="border rounded-lg p-4 shadow-sm"
                >
                    {/* Avatar */}
                    <Grid item xs={2} md={1}>
                        <Box display="flex" justifyContent="center">
                            <Avatar
                                sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
                                className="text-white"
                            >
                                A
                            </Avatar>
                        </Box>
                    </Grid>

                    {/* Review Content */}
                    <Grid item xs={9} md={10}>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-lg">Code with Reddy</p>
                                <p className="text-sm opacity-60">08 Apr 2026</p>
                            </div>

                            <Rating readOnly value={4.5} name="half-rating" precision={0.5} size="small" />

                            <p className="text-sm text-gray-600">
                                Very good service and professional staff. Highly recommended!
                            </p>
                        </div>
                    </Grid>

                    {/* Delete Button */}
                    <Grid item xs={1} className="flex justify-end">
                        <IconButton size="small">
                            <Delete sx={{ color: "error.main" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ReviewCard;