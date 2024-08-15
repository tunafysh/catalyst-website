import { NextRequest, NextResponse, userAgent } from 'next/server'
 
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const { os, browser } = userAgent(request)
  let osname = os.name
  let headers = request.headers.get("User-Agent")
  if (headers?.includes("PowerShell")){
    if (osname == "Windows"){
      return NextResponse.rewrite(url+"install.ps1")
    }
    else {
      return NextResponse.rewrite(url+"install")
    }
  }
  else if (headers?.includes("curl")){
    console.log("curl")
    return NextResponse.rewrite(url+"install")
  }
}