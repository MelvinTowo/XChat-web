import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import {NextResponse} from "next/server"

export async function POST(
    request: Request
) {
    try{
        const body = await request.json();
        const {
            email,
            name,
            password
        } = body;

        // This notifies user if the forgot to fill in any of the fields
        if(!email || !name || !password) {
            return new NextResponse("You may be missing some info", {status: 400})
        }

        //encrypting the passwords into the database
        //poor practice to store passwords as text in the db


        //asynchronously hashes the provided password using bcrypt with a cost factor of 12
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name, 
                hashedPassword
            }
        })

        return NextResponse.json(user);
    } catch(error: any) {
        console.log(error, "REGISTRATION_ERROR")
        return new NextResponse('Internal Error', {status: 500})
    }
}