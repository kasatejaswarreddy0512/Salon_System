import React from "react";
import Grid from "@mui/material/Grid";
import { Avatar, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "src/Redux/Review/action";

const ReviewCard = ({ item }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    const handleDeleteReview = () => {
        dispatch(deleteReview({
            reviewId: item.id,
            jwt: localStorage.getItem("jwt")
        }))
    }

    return (
        <div className="flex justify-between ">
            <div className="w-[90%] ">
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
                                {item.user.fullName[0]}
                            </Avatar>
                        </Box>
                    </Grid>

                    {/* Review Content */}
                    <Grid item xs={10} md={10}>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-lg">{item.user.fullName}</p>
                                <p className=" ml-[170px] text-sm opacity-60">
                                    {new Date(item.createAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>

                            <Rating readOnly value={item.rating} name="half-rating" precision={0.5} size="small" />

                            <p className="text-sm text-gray-600">
                                {item.reviewText}
                            </p>
                        </div>
                    </Grid>

                    {/* Delete Button */}

                    {item.user.id === auth.user?.id && <IconButton size="small" onClick={handleDeleteReview}>
                        <Delete sx={{ color: "error.main" }} />
                    </IconButton>}

                </Grid>
            </div>
        </div>
    );
};

export default ReviewCard;