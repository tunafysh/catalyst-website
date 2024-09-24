import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { Catalyst } from "@/components/definitions/defs";
import path from "path";

export function GET(req: NextRequest) 
{
    if(!fs.existsSync("../latestver.json")){
        fs.appendFileSync("../latestver.json", JSON.stringify({version: "1.1.0"}), "utf8")
    }
    let latestversion = JSON.parse(fs.readFileSync("../latestver.json", "utf8")).version
    const url = req.nextUrl
    const agentpattern = /Catalyst\/(Windows|Unix)\/\d\.\d\.\d\/(check|update)/
    let useragent = req.headers.get("User-Agent")
    const agent = useragent?.match(agentpattern)![0]

    const cly = new Catalyst()
    if(agent !== undefined){

        cly.parse(agent)
        if (cly.action == "update") {
            const updateResponse = cly.update(latestversion, url);
            if (updateResponse instanceof Response) {
                return updateResponse;
            } else {
                switch (updateResponse) {
                    case "updatewin":
                        return NextResponse.rewrite(url.origin+"/scripts/update.ps1")
                        case "updateunix":
                            return NextResponse.rewrite(url.origin+"/scripts/update")
                            default:
                                return NextResponse.next();
                            }
                        }
    }
    else {
        return cly.checkupd(latestversion)
    }
    }
}