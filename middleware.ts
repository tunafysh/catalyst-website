import { NextRequest, NextResponse, userAgent } from 'next/server'
import { Catalyst } from './components/definitions/defs'

export function middleware(request: NextRequest) {
  const latestversion = 0.63
  const url = request.nextUrl
  const agentpattern = '/Catalyst\/(Windows|Unix)\/\d\.\d{2}\/(check|update)/g'
  const { os } = userAgent(request)
  let osname = os.name
  let headers = request.headers.get("User-Agent")
  if (headers?.includes("PowerShell")){
    return NextResponse.rewrite(url+"scripts/install.ps1")
  }
  else if (headers?.includes("curl")){
    return NextResponse.rewrite(url+"scripts/install")
  }
  else if (headers?.includes("Catalyst")) {
    
    const agent = headers.match(agentpattern)?.toString()
    const cly = new Catalyst()
    if (agent != undefined) {
      cly.parse(agent)
      if (cly.action == "update") {
        cly.update()
      }
      else {
        cly.checkupd()

      }
    }
  }
}