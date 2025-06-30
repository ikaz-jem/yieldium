import bcrypt from 'bcryptjs';
import UserSchema from '@/app/models/userSchema/UserSchema';
import dbConnect from '@/app/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';



export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response('Missing required fields', { status: 400 });
    }

    await dbConnect();

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return new Response('User already exists', { status: 409 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new UserSchema({ name, email, password: hashedPassword });
    await newUser.save();

    return new Response('User created successfully', { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(req) {

  const session = await getServerSession(authOptions)

  if (!session) return Response.json({ success: false, message: 'Not Authorized' }, { status: 400 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // ?tok

  const user = await UserSchema.findById(id)

  if (!user) return Response.json({ success: false, message: 'User Not found' }, { status: 400 });

  return Response.json({ success: true, data: user }, { status: 200 });


}
