"use server";
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET(req: NextRequest){
    let latestversion = await kv.get<string>("version")
    return NextResponse.json(latestversion)
}

export async function POST(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("key")
    const version = req.nextUrl.searchParams.get("version")
    let message = {}
    if(!key || !version) return NextResponse.json({message: "Missing parameters"})
    
    if(key === process.env.CATALYST_KEY){
        await kv.set("version", version)
        message = {message: "Success"}
    }
    else{
        message = {message: "Invalid API key"}
    }

    return NextResponse.json(message)
}