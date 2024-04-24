import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {phone,name,password} = reqBody;
        const user = await prisma.user.findUnique({
            where:{phone:phone},
        })
        if(user){
            return NextResponse.json({message:"User already exist in our database."})
        }
        const newUser = await prisma.user.create({
            data:{
                phone:phone,
                name:name,
                password:password
            }
        })
        return NextResponse.json(newUser);
    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message},{status:400});
    }
}