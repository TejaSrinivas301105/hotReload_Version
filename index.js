#!/usr/bin/env node
import { Root, build, run } from "./CLI/parseArgs.js";
import { buildProject } from "./Build/bulider.js";
import { startServer, stopServer } from "./Process/Server_Managment.js";
import { fileWatcher } from "./File_Watcher/watcher.js";

let building = false;
let pendingChange = false;

async function rebuild(config) {
    if (building) {
        pendingChange = true;
        return;
    }
    building = true;
    try {
        await stopServer();
        await buildProject(config.build);
        startServer(config.exec);
    } catch (err) {
        console.error("[hotreload] rebuild failed");
    }
    building = false;
    if (pendingChange) {
        pendingChange = false;
        rebuild(config);
    }
}
    async function main() {

        const config = { root: Root, build, exec: run };

        await buildProject(config.build);
        startServer(config.exec);

        fileWatcher(config.root, () => {
            console.log("[hotreload] File change detected");
            rebuild(config);
        });

    }

main();
