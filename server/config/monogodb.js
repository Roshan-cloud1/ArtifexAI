import mongoose from "mongoose"

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}ArtifexAI`)
    console.log("Database connected successfully")
    
  } catch (error) {
    console.error("Failed to connect to database:", error)
    process.exit(1)
  }
}

export default connectDB