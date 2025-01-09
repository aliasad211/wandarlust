const express = require("express");
const router = express.Router({mergeParams:true});
//require wrapAsyncfunction used for error handling
const wrapAsync = require("../util/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")


// Reviews Post route
router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReview));
//Delete review route
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview)
);

module.exports = router;







// Reviews Post route
// router.post("/", validateReview, wrapAsync(async (req, res) => {
//     const { id } = req.params; // Get the listing ID from the URL
//     console.log("Listing ID from URL:", id); // Debugging line

//     const listing = await Listing.findById(id).populate("reviews");

//     if (!listing) {
//         console.error(`Listing with ID ${id} not found`);
//         return res.status(404).json({ message: "Listing not found" });
//     }

//     const { review } = req.body;

//     const newReview = new Review({
//         comment: review.comment,
//         rating: review.rating,
//     });

//     await newReview.save();

//     listing.reviews.push(newReview._id);
//     await listing.save();

//     res.redirect(`/listings/${id}`);
// }));

// app.get("/listings/:id",validateReview, wrapAsync(async (req, res) => {
//     const { id } = req.params;
    
//     // Find the listing by ID and populate the reviews field
//     const listing = await Listing.findById(id).populate("reviews");
    
//     if (!listing) {
//         return res.status(404).json({ message: "Listing not found" });
//     }

//     res.render("listing/show.ejs", { listing });
// }));

//deleteReview

// app.post("/listings/:id/reviews", async (req, res) => {
//     try {
//       // Find the listing by ID
//       let listing = await Listing.findById(req.params.id);
//       if (!listing) {
//         return res.status(404).send("Listing not found");
//       }
  
//       // Create a new review from the request body
//       let newReview = new Review(req.body.review);
  
//       // Add the new review to the listing's reviews array
//       listing.reviews.push(newReview);
  
//       // Save the review and update the listing
//       await newReview.save();
//       await listing.save();
  
//       console.log("New review saved");
//       res.send("New review saved successfully!");
//     } catch (err) {
//       console.error("Error saving review:", err);
//       res.status(500).send("An error occurred while saving the review.");
//     }
//   });

