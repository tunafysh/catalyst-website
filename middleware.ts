import { NextRequest, NextResponse } from 'next/server'
import { Catalyst } from './components/definitions/defs'
import fs from 'fs'

export function middleware(req: NextRequest) {
  let latestversion: string= JSON.parse(fs.readFileSync("./components/versioning/latestver.json", "utf8")).version
  const url = req.nextUrl
  const agentpattern = /Catalyst\/(Windows|Unix)\/\d\.\d\.\d\/(check|update)/
  let useragent = req.headers.get("User-Agent")
  
  if (useragent?.includes("PowerShell")){
    return NextResponse.rewrite(url.origin+"/scripts/install.ps1")
  }
  if (useragent?.includes("curl")){
    return NextResponse.rewrite(url.origin+"/scripts/install")
  }
  if (useragent?.match(agentpattern)) {
    return NextResponse.rewrite(url.origin+"/update")
  }
}