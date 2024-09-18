import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    let latestversion: string= process.env.CATALYST_VERSION as string;
    return NextResponse.json(latestversion)
}

export function POST(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("key")
    const version = req.nextUrl.searchParams.get("version")

    if(!key || !version) return NextResponse.json({message: "Missing parameters"})
    
    if(key === process.env.CATALYST_KEY){
        process.env.CATALYST_VERSION = version
    }
    else{
        return NextResponse.json({message: "Invalid key"})
    }

    return NextResponse.json({})
}