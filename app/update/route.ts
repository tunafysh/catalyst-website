import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import crypto from "crypto"
import Router from "next/router";

export function GET(req: NextRequest) {
    let url = req.nextUrl
    const searchparams = req.nextUrl.searchParams
    const latestversion = 0.63;
    let { os, arch } = { os: String(""), arch: String("") }
    if (req.headers.get("User-Agent")?.includes("Catalyst")) {
        const agentpattern = /Catalyst\/Windows|Unix|\/|x86|x86_64|arm64\/\d\.\d{2}/g
        const agent = req.headers.get("User-Agent")?.match(agentpattern)?.toString()
        let data = agent?.split("/")
        if (data && data[1] === "Windows") {
            os = "Windows"
        } else {
            os = "Unix"
        }

        if (data && parseFloat(data[3]) >= latestversion) {
            return new NextResponse("Largerversion")
        }
        else if (data && parseFloat(data[3]) == latestversion) {
            return new NextResponse("Equalversion")
        }
        let filepath: string;

        if (data) {
            if (os == "Windows") {
                filepath = 'public/binaries/catalyst_' + os + '_' + data[2] + '.exe';
            }
            else {
                filepath = 'public/binaries/catalyst_' + os + '_' + data[2];
            }
        } else {
            // Handle the case where data is null or undefined
            filepath = 'default_filepath'; // or throw an error
        }

        if (filepath) {
            const fileContent = fs.readFileSync(filepath, { encoding: 'binary' });
            // Create a response with the file content
            const fileResponse = new Response(fileContent, {
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Disposition': 'attachment; filename="catalyst"',
                },
            });

            // Create a JSON response with additional text
            const fileBuffer = fs.readFileSync(filepath);
            const hash = crypto.createHash('sha256').update(fileBuffer).digest('base64');
            const jsonResponse = NextResponse.json({
                "hash": hash
            })

            // Combine both responses
            return new Response(jsonResponse.body, {
                headers: {
                    ...jsonResponse.headers,
                    ...fileResponse.headers,
                },
            });
        }

    }
    else {
        url.pathname = '/'
        searchparams.set("redirect", "true")
        Router.push('/')
    }
}
