const mongoose = require("mongoose");
const { Task } = require("../models/Task");
mongoose
  .connect(
    "mongodb+srv://admin:admin123@cluster0.turlv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB to run script"))
  .catch((err) => console.error("Error connecting to MongoDB in script:", err));

// mongoose.connection.once("open", async () => {
//   console.log("Connected to MongoDB");

//   try {
//     // Update each task to add the createdAtDate field
//     const  tasks  = await Task.find();

//     for (let task of tasks) {
//       // Extract date from the createdAt field
//       const createdAtDate = task.createdAt.toISOString().split("T")[0]; // 'YYYY-MM-DD' format

//       // Update the task with the new createdAtDate field
//       task.createdAtDate = createdAtDate;
//       await task.save();
//     }

//     console.log("All tasks have been updated with the createdAtDate field.");
//   } catch (error) {
//     console.error("Error updating tasks:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// });

async function addCreatedAtDateField() {
  console.log("-", Task);
  try {
    // Find all quizzes that do not have the new fields
    const tasks = await Task.find();
    for (let task of tasks) {
      // Extract date from the createdAt field
      const createdAtDate = task.createdAt.toISOString().split("T")[0]; // 'YYYY-MM-DD' format

      // Update the task with the new createdAtDate field
      task.createdAtDate = createdAtDate;
      await task.save();
    }
    console.log("All tasks have been updated with the createdAtDate field.");
  } catch (err) {
    console.error("Error during migration:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}
addCreatedAtDateField();
