import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";

const prisma = new PrismaClient();


export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {phone,password} = reqBody;
        const user = await prisma.user.findUnique({
            where:{phone:phone}
        })
        if(!user){
            return NextResponse.json({error:"Invalid Credentials"})
        }
        if(user.password===password){
            return NextResponse.json(user);
        }else{
            return NextResponse.json({error:"Invalid Credentials"});
        }
    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error},{status:400});
    }
}