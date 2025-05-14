import mongoose, { mongo } from 'mongoose';
import Withdraw from '../withdrawSchema/withdrawSchema'
import Deposit from '../depositSchema/depositSchema'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone:{type:String},
  password:{type: String},
  balance:{type:Number,default:0},
  invested:{type:Number,default:0},
  deposits:[{type:mongoose.Types.ObjectId , ref:'Deposit'}],
  withdrawls:[{type:mongoose.Types.ObjectId , ref:'Withdraw'}],
  verified:{type:Boolean,default:false},
  role:[{type:String,default:'user'}],
  verificationToken: String,
  verificationTokenExpires: Date,
  emailVerified:{type:Boolean,default:false},
  accountType:{type:mongoose.Types.ObjectId , ref:'Package'},
  index:{type:Number,default:undefined}
},  
 {
  timestamps: true 
}
)

export default mongoose.models.User || mongoose.model('User', UserSchema);
