import {spawn} from 'child_process'
import kill from 'tree-kill'

let serverProcess = null;
let lastStartTime = 0;
let crashCount = 0;
const CRASH_THRESHOLD = 3000; // 3 seconds
const MAX_CRASHES = 3;

export function startServer(command){
    const now = Date.now();
    
    // Check if previous server crashed quickly
    if (lastStartTime && (now - lastStartTime) < CRASH_THRESHOLD) {
        crashCount++;
        console.log(`[hotreload] Quick restart detected (${crashCount}/${MAX_CRASHES})`);
        if (crashCount >= MAX_CRASHES) {
            console.error("[hotreload] Server crashed too many times. Waiting 10 seconds...");
            setTimeout(() => {
                crashCount = 0;
                startServer(command);
            }, 10000);
            return;
        }
    } else {
        crashCount = 0;
    }
    
    lastStartTime = now;
    console.log("[hotreload] Starting server...");
    serverProcess = spawn(command, {
        stdio: 'inherit',
        shell: true
    });
    
    serverProcess.on('exit', (code) => {
        if (code !== 0 && code !== null) {
            console.error(`[hotreload] Server exited with code ${code}`);
        }
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