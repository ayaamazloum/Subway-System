import React, { useEffect, useState } from "react";
import Review from "./Review";
import sendRequest from "../../../core/tools/remote/request";
import { requestMehods } from "../../../core/enums/requestMethods";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const deleteReview = async (id) => {
    const response = await sendRequest(requestMehods.DELETE, `reviews/${id}`);
    setLoading(true);
    if (response.data.status === "success") {
      sendRequest(requestMehods.GET, "reviews").then((response) => {
        setReviews(response.data.data);
      });
      toast.success(response.data.message);
    }
  };
  useEffect(() => {
    sendRequest(requestMehods.GET, "reviews").then((response) => {
      setReviews(response.data.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="content w-full">
        <h1 className="p-relative fs-30">Reviews</h1>
        {loading ? (
          <BeatLoader
            className="loader"
            color={"#35b368"}
            loading={loading}
            size={50}
          />
        ) : (
          <div className="reviews-page d-grid gap-20 m-20">
            {reviews?.map((review) => {
              return (
                <Review
                  key={review.id}
                  review={review}
                  handleDelete={deleteReview}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
