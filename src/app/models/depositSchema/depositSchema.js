import mongoose from "mongoose"
import User from '../userSchema/UserSchema'

const depositSchema = new mongoose.Schema(
  {
    user:{type: mongoose.Types.ObjectId, ref: 'User' }, 
    currency:{type:String},
    amount:{type:Number},
    address:{type:String},
    chain:{type:String},
    forwarded:{type:Boolean}
},
  {
    timestamps: true,
  }
);


export default mongoose.models.Deposit || mongoose.model('Deposit', depositSchema);
