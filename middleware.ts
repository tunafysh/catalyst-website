import { NextRequest, NextResponse } from 'next/server'
import { Catalyst, Clyversion } from './components/definitions/defs'

export function middleware(request: NextRequest) {
  const latestversion: Clyversion = '0.6.3'
  const url = request.nextUrl
  const agentpattern = /Catalyst\/(Windows|Unix)\/\d\.\d\.\d\/(check|update)/
  let useragent = request.headers.get("User-Agent")
  if (useragent?.includes("PowerShell")){
    return NextResponse.rewrite(url.origin+"/scripts/install.ps1")
  }
  if (useragent?.includes("curl")){
    return NextResponse.rewrite(url.origin+"/scripts/install")
  }
  if (useragent?.match(agentpattern)) {
    const agent = useragent.match(agentpattern)![0]
    const cly = new Catalyst()
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
