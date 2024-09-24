import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

let latestversion = JSON.parse(fs.readFileSync("./components/versioning/latestver.json", "utf8")).version
export function GET(req: NextRequest){
    return NextResponse.json(latestversion)
}

export function POST(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("key")
    const version = req.nextUrl.searchParams.get("version")
    let message = {}
    if(!key || !version) return NextResponse.json({message: "Missing parameters"})
    
    if(key === process.env.CATALYST_KEY){
        fs.writeFileSync("./components/versioning/latestver.json", JSON.stringify({version: version}), "utf8")
        message = {message: "Success"}
    }
    else{
        message = {message: "Invalid API key"}
    }

    return NextResponse.json(message)
}