import { PrismaClient } from "@prisma/client";
import { NextResponse,NextMiddleware, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    
}