import { NextURL } from "next/dist/server/web/next-url";

export class Catalyst {
    os: string = '';
    ver: string = '0.0.0';
    action: string = '';

    parse(str: string) {
        const data = str.split("/");
        data.shift();
        this.os = data[0];
        const version = data[1].split(".");
        if (version.length === 3 && version.every(part => !isNaN(Number(part)))) {
            this.ver = version.join(".") as string;
        } else {
            // handle invalid version format
        }
        this.action = data[2];
    }

    checkupd(latestversion: string) {
        const ver = this.ver;
        if (ver > latestversion) {
            return new Response('largerver', { headers: { "Content-Type": "text/plain" } });
        } else if (ver === latestversion) {
            return new Response('latestver', { headers: { "Content-Type": "text/plain" } });
        } else if (ver < latestversion) {
            return new Response('updateavailable', { headers: { "Content-Type": "text/plain" } });
        }
    }

    update(latestversion: string, url: NextURL): Response | string {
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

export const appstate = Object.freeze({
    "ok": 0,
    "error": 1,
    "warn": 2
})