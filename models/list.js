// // Import mongoose
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define the structure of a listing document
// const listingSchema = new Schema({
//     title: {
//         type: String,
//     },
//     description: {
//         type: String,
//     },
//     image: {
//         type: String,
//         default:"https://plus.unsplash.com/premium_photo-1661928975475-57502a6e34a5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3VjY2Vzc3xlbnwwfHwwfHx8MA%253D%253D",
//         set: (v) =>
//             v === ""
//                 ? "https://plus.unsplash.com/premium_photo-1661928975475-57502a6e34a5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3VjY2Vzc3xlbnwwfHwwfHx8MA%253D%253D"
//                 : v,
//     },
//     price: {
//         type: Number, // Changed to Number as price is usually numeric
//     },
//     location: {
//         type: String,
//     },
//     country: {
//         type: String,
//     },
// });

// // Create a Mongoose model based on the schema
// const Listing = mongoose.model("Listing", listingSchema);

// // Export this model
// // module.exports = Listing;
// Import mongoose
const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

// Define the structure of a listing document
const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
       url: String,
       filename: String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId, // Specifies that this field will hold an ObjectId
        ref: "User",               // References the "User" collection/model
    },
    geometry: {
            type: {
              type: String, // Don't do `{ location: { type: String } }`
              enum: ['Point'], // 'location.type' must be 'Point'
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

// Create a Mongoose model based on the schema
const Listing = mongoose.model("Listing", listingSchema);

// Export this model
module.exports = Listing;
