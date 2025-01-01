import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  house: { type: String, required: true },
  road: { type: String, required: true },
  category: { type: String, enum: ["Home", "Office", "Friends & Family"], required: true },
  location: { type: [Number], required: true }, // [latitude, longitude]
  displayAddress: { type: String, required: true },
});

const addressModel = mongoose.models.address || mongoose.model("address", addressSchema);

export default addressModel;
