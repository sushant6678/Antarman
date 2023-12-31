import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  license: { type: String }, // Add the 'license' field for the license photo URL
  ticketPrice: { type: Number },
  role: {
    type: String,
  },
  specialization: { type: String },
  qualifications: {
    type: Array,
  },
  experiences: {
    type: Array,
  },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
});

export default mongoose.model("Doctor", DoctorSchema);
