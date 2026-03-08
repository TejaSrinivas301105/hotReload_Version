import {exec} from 'child_process'

export function buildProject(buildCommand) {
    return new Promise((resolve, reject)=>{
        exec(buildCommand, (error, stdout, stderr) => {

        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);

        if (error) {
            console.error("[hotreload] Build failed");
            reject(error);
        } else {
            console.log("[hotreload] Build successful");
            resolve();
        }
        });
    })
}
