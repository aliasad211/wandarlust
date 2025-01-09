// Import the Review model created in review.js
const Review = require("../models/review.js");
// Import the Listing model created in list.js
const Listing = require("../models/list.js");


module.exports.createReview = async (req, res) => {
    try {
        const { id } = req.params; // Get the listing ID from the URL
        const { review } = req.body; // Get the review data from the request body
        // Step 1: Find the listing by its ID
        const listing = await Listing.findById(id).populate("reviews");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Step 2: Create a new Review
        const newReview = new Review({
            comment: review.comment,
            rating: review.rating,
        });
        newReview.author = req.user._id;

        // Step : Push the new Review's ID to the listing's reviews array
        listing.reviews.push(newReview._id);
        // Step : Save the new Review to the database
        await newReview.save();

        // Step 5: Save the updated listing with the new Review reference
        await listing.save();

        // Respond to the user with either a JSON message or a redirect, but not both
        // Option 1: Respond with JSON
        // res.status(201).json({ message: "Review added successfully", review: newReview });
 
        req.flash("success", "New Review Created!");
        // Option 2: Redirect to the specific listing
        res.redirect(`/listings/${id}`); // Uncomment this if you want to redirect instead of sending JSON
    } catch (error) {
        console.error("Error adding review: ", error);
        res.status(500).json({ message: "An error occurred while adding the review" });
    }
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Find the listing and update its reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review from the reviews collection
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted successfully!");
    res.redirect(`/listings/${id}`); // Redirect back to the listing page

};