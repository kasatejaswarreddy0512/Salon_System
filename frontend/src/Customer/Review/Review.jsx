import React from "react";
import ReviewCard from "./ReviewCard";
import RactingCard from "./RatingCard";

const Review = () => {
    return (
        <div className="pt-10 flex flex-col lg:flex-row gap-16">

            {/* Left Section */}
            <section className="w-full lg:w-[40%] space-y-4">
                <h1 className="text-xl font-semibold">Review & Rating</h1>

                <RactingCard />
            </section>

            {/* Right Section */}
            <section className="w-full lg:w-[60%] space-y-5">
                <div className="mt-5">
                    <div className="space-y-5">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <ReviewCard key={item} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Review;