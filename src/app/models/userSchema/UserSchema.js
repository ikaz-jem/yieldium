import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  balance:{type:Number,default:0},
  verified:{type:Boolean,default:false},
  deposits:[{type:mongoose.Types.ObjectId}],
  withdrawls:[{type:mongoose.Types.ObjectId}],
  role:[{type:String,default:'user'}],
  verificationToken: String,
  verificationTokenExpires: Date,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
