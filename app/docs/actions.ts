"use server"
import { promises as fs } from 'fs'
export async function getDocs() {
    var content = fs.readFile(`app/docs/content/home.md`, "utf-8");
    return content.then((data) => data);
}