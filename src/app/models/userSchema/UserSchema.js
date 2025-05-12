import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone:{type:String},
  password: String,
  balance:{type:Number,default:0},
  deposits:[{type:mongoose.Types.ObjectId}],
  withdrawls:[{type:mongoose.Types.ObjectId}],
  verified:{type:Boolean,default:false},
  role:[{type:String,default:'user'}],
  verificationToken: String,
  verificationTokenExpires: Date,
  emailVerified:{type:Boolean,default:false},
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
