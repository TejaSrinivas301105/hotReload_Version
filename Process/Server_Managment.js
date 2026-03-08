import {spawn} from 'child_process'

import kill from 'tree-kill'


let serverProcess = null;

export function startServer(command){
    console.log("the server is starting");
    serverProcess = spawn(command, {
        stdio: 'inherit',
        shell: true
    });
}

export function stopServer(){
    return new Promise((resolve)=>{
        if(!serverProcess) return resolve();
        console.log("[hotreload] stopping server");
        kill(serverProcess.pid,'SIGTERM',()=>{
            serverProcess = null;
            resolve();
        })
    });
}