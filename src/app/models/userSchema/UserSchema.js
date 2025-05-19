import mongoose, { mongo } from 'mongoose';
import Withdraw from '../withdrawSchema/withdrawSchema'
import Deposit from '../depositSchema/depositSchema'

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone:{type:String},
  password:{type: String},
  balance:{type:Number,default:0},
  image:{type:String,defaul:null},
  invested:{type:Number,default:0},
  deposits:[{type:mongoose.Types.ObjectId , ref:'Deposit'}],
  withdrawls:[{type:mongoose.Types.ObjectId , ref:'Withdraw'}],
  verified:{type:Boolean,default:false},
  role:[{type:String,default:'user'}],
  verificationToken: String,
  verificationTokenExpires: Date,
  emailVerified:{type:Boolean,default:false},
  accountType:{type:mongoose.Types.ObjectId , ref:'Package'},
  walletIndex:{type:Number,default:undefined}
},  
 {
  timestamps: true 
}
)

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next(); // Only run on new users

  if (this.walletIndex !== undefined && this.walletIndex !== null) {
    return next();
  }

  const timestampIndex = Math.floor(Date.now() / 1000);
  this.walletIndex = timestampIndex;
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
