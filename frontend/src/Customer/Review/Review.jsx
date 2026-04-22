import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "src/Redux/Review/action";
import { useParams } from "react-router-dom";
import RatingCard from "./RatingCard";

const Review = () => {


    const dispatch = useDispatch();
    const { review } = useSelector(store => store);
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchReviews({
            salonId: id,
            jwt: localStorage.getItem("jwt")
        }))
    }, [])

    return (
        <div className="pt-10 flex flex-col lg:flex-row gap-16">

            {/* Left Section */}
            <section className="w-full lg:w-[40%] space-y-4">
                <h1 className="text-xl font-semibold">Review & Rating</h1>

                <RatingCard />
            </section>

            {/* Right Section */}
            <section className="w-full lg:w-[60%] space-y-5">
                <div className="mt-5">
                    <div className="space-y-5">
                        {review.reviews.map((item) => (
                            <ReviewCard key={item} item={item} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Review;