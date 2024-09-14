import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    let latestversion: string= process.env.CATALYST_VERSION as string;
    return NextResponse.json(latestversion)
}

export function POST(req: NextRequest) {
    let key = process.env.CATALYST_KEY as string;
    let response: string= "";
    req.json().then((data) => {
            if(key != undefined){

                if (data.key == key) {
                    process.env.CATALYST_VERSION = data.version
                    response += JSON.stringify({status: "Updated value"})
                }
                else {
                    response += JSON.stringify({status: "Invalid key"})
                }
            }
    });
    return NextResponse.json(response)
}