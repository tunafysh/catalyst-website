import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export class Catalyst {
    os: string = '';
    ver: number = 0;
    action: string = '';

    parse(str: string) {
        const data = str.split("/");
        data.shift();
        this.os = data[0];
        this.ver = Number(data[1]);
        this.action = data[2];
    }

    checkupd(latestversion: number) {
        const ver = this.ver;
        if (ver > latestversion) {
            return new Response('largerver', { headers: { "Content-Type": "text/plain" } });
        } else if (ver === latestversion) {
            return new Response('latestver', { headers: { "Content-Type": "text/plain" } });
        } else if (ver < latestversion) {
            return new Response('updateavailable', { headers: { "Content-Type": "text/plain" } });
        }
    }

    update(latestversion: number, url: NextURL): Response | string {
        const ver = this.ver;
        const os = this.os;
        if (ver > latestversion) {
            return new Response('largerver', { headers: { "Content-Type": "text/plain" }, status: 200 });
        } else if (ver === latestversion) {
            return new Response('latestver', { headers: { "Content-Type": "text/plain" }, status: 200  });
        } else {
            if (os == "Windows") {
                return 'updatewin'
            } else {
                return 'updateunix'
            }
        }
    }
}
