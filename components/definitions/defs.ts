export class Catalyst {
    os: string = '';
    ver: string = '';
    action: string = '';

    parse(str: string) {
        const data = str.split("/");
        data.shift();
        this.os = data[0];
        this.ver = data[1];
        this.action = data[2];
    }

    checkupd(): void {
        const ver = this.ver;
        const os = this.os;
        const latestversion = (global as any).latestversion;

        if (ver > latestversion) {
            console.log("largerver");
            process.exit();
        } else if (ver === latestversion) {
            console.log("latestver");
            process.exit();
        } else if (ver < latestversion) {
            console.log("updatevaliable");
            process.exit();
        }
    }

    update(): void {
        const ver = this.ver;
        const os = this.os;
        const latestversion = (global as any).latestversion;

        if (ver > latestversion) {
            console.log(latestversion);
            console.log("largerver");
            process.exit();
        } else if (ver === latestversion) {
            console.log("latestver");
            process.exit();
        } else {
            console.log("updatevaliable");
            if (os.includes("Win")) {
                console.log(require('fs').readFileSync("scripts/update.ps1", 'utf8'));
            } else {
                console.log(require('fs').readFileSync("scripts/update", 'utf8'));
            }
            process.exit();
        }
    }
}
