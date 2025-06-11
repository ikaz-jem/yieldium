import mongoose from "mongoose";

const StakingSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  duration: { type: Number, required: true }, // enforce allowed durations
  profits: { type: Number, required: true },
  rate: { type: Number, required: true },
  isLocked: { type: Boolean, default: true },
  claimed: { type: Boolean, default: false },
  unlocksAt: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.models.Staking || mongoose.model("Staking", StakingSchema);
