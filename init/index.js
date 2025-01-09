const mongoose = require("mongoose");
const initData = require("./data.js");
//require models
const Listing = require("../models/list.js");

//create connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wandarlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"676f4ab115bec322c241d591"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/list.js");

// // MongoDB connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// async function main() {
//     try {
//         await mongoose.connect(MONGO_URL);
//         console.log("Connected to MongoDB");
//         await initDB(); // Initialize data after successful connection
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// // Initialize Database
// const initDB = async () => {
//     try {
//         await Listing.deleteMany({});
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");
//     } catch (err) {
//         console.error("Error initializing data:", err);
//     }
// };

// main();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// // Require models
// const Listing = require("../models/list.js");

// // Create connection
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// async function main() {
//     await mongoose.connect(MONGO_URL);
// }
// main()
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.log("Error connecting to MongoDB:", err);
//     });

// const initDB = async () => {
//     try {
//         // Check if data is in array format
//         if (!Array.isArray(initData.data)) {
//             console.error("Data to insert is not in array format.");
//             return;
//         }

//         // Clear existing data and insert new data
//         await Listing.deleteMany({});
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");

//     } catch (error) {
//         console.error("Error during data initialization:", error);
//     }finally {
//         // Close the connection after data initialization
//         mongoose.connection.close();
//         console.log("Database connection closed");
//     }
// };

// // Run initialization
// initDB();
