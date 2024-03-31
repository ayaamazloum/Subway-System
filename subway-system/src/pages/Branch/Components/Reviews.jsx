import React from "react";
import Review from "./Review";

const Reviews = () => {
  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Reviews</h1>
        <div className="reviews-page d-grid gap-20 m-20">
          <Review />
        </div>
      </div>
    </>
  );
};

export default Reviews;
