import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    let latestversion: string= process.env.CATALYST_VERSION as string;
    return NextResponse.json(latestversion)
}

export function POST(req: NextRequest) {
    let key = process.env.CATALYST_KEY as string;
    req.json().then((data) => {
       if (data.key === key) {
            process.env.CATALYST_VERSION = data.version as string
            return NextResponse.json({status: "success"})
        }
    });
    return NextResponse.json({status: "error"})
}