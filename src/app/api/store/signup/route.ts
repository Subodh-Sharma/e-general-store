import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {storeId,name,location,paymentDetails,password} = reqBody;
        const store = await prisma.store.findUnique({
            where:{storeId:storeId},
        })
        if(store){
            return NextResponse.json({message:"Store already exist in our database."})
        }
        const newStore = await prisma.store.create({
            data:{
                storeId:storeId,
                name:name,
                location:location,
                payment:paymentDetails,
                password:password
            }
        })
        return NextResponse.json(newStore);
    }catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message},{status:400});
    }
}