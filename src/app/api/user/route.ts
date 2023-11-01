import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// export async function GET(){
//     return NextResponse.json({ success: true })
// }

// define validation schema
const userSchema = z
    .object({
        username: z
            .string()
            .min(1, "Username is required")
            .max(10),
        email: z
            .string()
            .min(1, "Email is required")
            .email('Invalid Email format'),
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
    })

export async function POST(req : Request){
    try {
       const body = await req.json();
       const { email, username, password } = userSchema.parse(body);

       //check if email already exists
       const existingUserByEmail = await db.user.findUnique({
        where: {email :email}
       });
       if (existingUserByEmail) {
        return NextResponse.json({ user: null, message: "This email is already in use"}, { status: 409});
       }
        
       //check if username already exists
       const existingUserByUsername = await db.user.findUnique({
        where: {username :username}
       });
       if (existingUserByUsername) {
        return NextResponse.json({ user: null, message: "This username is already in use"}, { status: 409});
       }

       // password encryption for security 
       const hashedPassword = await hash(password, 10)

       //create user in db
       const newUser = await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
       })

       const { password: newUserPassword, ...rest} = newUser

       return NextResponse.json({ user: rest, message: "User created successfully"}, { status: 201})

    } catch (error) {
        return NextResponse.json({ message: "Oops, Something went wrong"}, { status: 500})
    }
}