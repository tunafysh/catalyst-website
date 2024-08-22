import { NextRequest, NextResponse, userAgent } from 'next/server'
import crypto from "crypto" 

export function middleware(request: NextRequest) {
  const latestversion = 0.63
  const url = request.nextUrl
  const { os, browser } = userAgent(request)
  let osname = os.name
  let headers = request.headers.get("User-Agent")
  if (headers?.includes("PowerShell")){
    if (osname == "Windows"){
      return NextResponse.rewrite(url+"scripts/install.ps1")
    }
    else {
      return NextResponse.rewrite(url+"scripts/install")
    }
  }
  else if (headers?.includes("curl")){
    console.log("curl")
    return NextResponse.rewrite(url+"scripts/install")
  }
  else if (headers?.includes("Catalyst")) {
    const agentpattern = /Catalyst\/Windows|Unix|\/|x86|x86_64|arm64\/\d\.\d{2}/g
    const agent = headers.match(agentpattern)?.toString()
    let data = agent?.split("/")
    if (data && data[1] === "Windows") {
        osname = "Windows"
    } else {
        osname = "Unix"
    }

    if (data && parseFloat(data[3]) >= latestversion) {
        return new NextResponse("Largerversion")
    }
    else if (data && parseFloat(data[3]) == latestversion) {
        return new NextResponse("Equalversion")
    }
    else {

      if (osname == "Windows") {
        NextResponse.rewrite(url+"scripts/update.ps1")
      }
      else {
        NextResponse.rewrite(url+"scripts/update")
      }
    }
  }

}