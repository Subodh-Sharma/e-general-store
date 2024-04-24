import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {storeId,userId,takeawayTime,orderNo,orderItems} = reqBody;
        const store = await prisma.store.findUnique({
            where:{
                id:storeId
            }
        })
        if(!store) return NextResponse.json({error:"This Store is not exist!"});
        const placeOrder = await prisma.order.create({
            data: {
                store: { connect: { id: storeId } },
                user: { connect: { id: userId } },
                orderNo:orderNo,
                takeawayTime: new Date(takeawayTime),
                orderItems: {
                  create: orderItems.map((i:any) => ({
                        itemId : i.itemId,
                        quantity: i.quantity,
                    })),
                }
            },
            include : {
                orderItems: true
            }
        })
        if(placeOrder) return NextResponse.json({placeOrder});
    }catch(error){
        return NextResponse.json({error:error},{status:400});
    }
}