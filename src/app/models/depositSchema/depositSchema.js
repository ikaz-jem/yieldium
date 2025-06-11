import mongoose from "mongoose"
import User from '../userSchema/UserSchema'
import Balance from "../balanceSchema/balanceSchema";

const depositSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    currency: { type: String },
    depositType: { type: String },
    amount: { type: Number },
    address: { type: String },
    signature: { type: String },
    chain: { type: String },
    forwarded: { type: Boolean },
    status: {type: String,enum: ['pending', 'credited', 'canceled', 'error'],default: 'pending'},
    walletIndex: { type: Number }
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Deposit || mongoose.model('Deposit', depositSchema);
