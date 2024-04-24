import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";

const prisma = new PrismaClient();


export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {storeId,password} = reqBody;
        const store = await prisma.store.findUnique({
            where:{storeId:storeId}
        })
        if(!store){
            return NextResponse.json({error:"Invalid Credentials"})
        }
        if(store.password===password){
            return NextResponse.json(store);
        }else{
            return NextResponse.json({error:"Invalid Credentials"});
        }
    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error},{status:400});
    }
}