import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, price, stock, storeuuid } = reqBody;

        const item = await prisma.items.findUnique({
            where: {
                name: name,
                store: {
                    some :{
                        storeUuid : storeuuid
                    }
                }
            },
            include: {
                store: true
            }
        })
        if (item) {
            return NextResponse.json({ message: "Item already in Stock" });
        }
        const newItem = await prisma.items.create({
            data: {
                name: name,
                price: price,
                stock: stock,
                store: {
                    create:{
                        storeUuid: storeuuid
                    }
                }
            },
            include:{
                store:{
                    select:{
                        id:true
                    }
                }
            }

        })
        return NextResponse.json({ newItem })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function GET(request:NextRequest){
    try{
        const searchParams = request.nextUrl.searchParams
        const storeuuid = searchParams.get('storeuuid')
        if(storeuuid==null){
            return NextResponse.json({message:"This Store not exist"});
        }
        const store = await prisma.store.findUnique({
            where:{
                id:storeuuid
            }
        })
        if(!store) return NextResponse.json({message:"This Store not exist"});
        const allItems = await prisma.items.findMany({
            where:{
                store:{
                    some:{
                        id:storeuuid
                    }
                }
            }
        })
        if(allItems.length===0){
            return NextResponse.json({message:"No Items exist at this Store"});
        }
        return NextResponse.json({allItems});
    }catch(error){
        console.log(error);
        return NextResponse.json({error:error},{status:400});
    }
}