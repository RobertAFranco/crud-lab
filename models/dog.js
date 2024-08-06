import mongoose from "mongoose";

const dogSchema = new mongoose.Schema({
    name: String,
    isReadyToAdopt: Boolean,
  });

  const Dog = mongoose.model("Dog", dogSchema); 

  export default Dog;