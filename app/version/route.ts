import { NextRequest, NextResponse } from "next/server";
import fs from "fs"

export function GET(req: NextRequest){
    if(!fs.existsSync("../latestver.json")){
        fs.appendFileSync("../latestver.json", JSON.stringify({version: "1.1.0"}), "utf8")
    }
    let latestversion = JSON.parse(fs.readFileSync("../latestver.json", "utf8")).version
    return NextResponse.json(latestversion)
}

export function POST(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("key")
    const version = req.nextUrl.searchParams.get("version")
    if(!fs.existsSync("../latestver.json")){
        fs.appendFileSync("../latestver.json", JSON.stringify({version: "1.1.0"}), "utf8")
    }
    let message = {}
    if(!key || !version) return NextResponse.json({message: "Missing parameters"})
    
    if(key === process.env.CATALYST_KEY){
        fs.writeFileSync("../latestver.json", JSON.stringify({version: version}), "utf8")
        message = {message: "Success"}
    }
    else{
        message = {message: "Invalid API key"}
    }

    return NextResponse.json(message)
}