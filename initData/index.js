
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const mongo_url = "mongodb://localhost:27017/Stayinn";

main()
.then(()=>{
    console.log("connected to DataBase");
    
}) 
.catch((err)=>{
    console.log(err);
    
});


async function main()
{
    await mongoose.connect(mongo_url);
}
/*
const initDB = async () =>{
    // Removing Random Data;
    // await Listing.deleteMany({});
    // initData.data = initData.data.map((obj)=>({
    //     ...obj , owner:req.user._id
    // }));
     await Listing.insertMany(initData.data);
     console.log("Data Is Initiallized Successfully");

      // await Listing.deleteMany({});

    const users = await User.find({}); 
     if (users.length === 0) {
    console.log("No users found! Please seed users first.");
  //   // return;
  // }
    initData.data = initData.data.map((obj) => {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        return { ...obj, owner: randomUser._id }; 
    });

  console.log("Prepared listings to insert:", initData.data.length);

try {
  const result = await Listing.insertMany(initData.data, { ordered: true });
  console.log("insertMany result:", result);
} catch (err) {
  console.error("Error inserting listings:", err);
}
     }};
  
    // await Listing.insertMany(initData.data);
    // console.log("Data Is Initialized Successfully");

*/
/*
const initDB = async () => {
    try {
        // Clear existing data to avoid duplicates.
        await Listing.deleteMany({});
        console.log("Existing listings deleted successfully.");

        const users = await User.find({});

        // If no users exist, insert listings without an owner.
        if (users.length === 0) {
            console.log("No users found. Initializing data without assigning an owner.");
            await Listing.insertMany(initData.data);
            console.log("Listings initialized successfully without owners.");
        } else {
            // If users exist, assign a random user as the owner for each listing.
            const listingsWithOwner = initData.data.map((obj) => {
                const randomUser = users[Math.floor(Math.random() * users.length)];
                return { ...obj, owner: randomUser._id };
            });

            // Insert the new listings with assigned owners.
            const result = await Listing.insertMany(listingsWithOwner);
            console.log(result);
            
            console.log(`Successfully inserted ${result.length} listings with owners.`);
        }
    } catch (err) {
        console.error("Error during database initialization:", err);
    }
};*/

const initDB = async() =>{
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj , owner:"68a8458bf638be6e0521274d"}));
  await Listing.insertMany(initData.data);
  console.log("Data is Initialized");
  
}
initDB();