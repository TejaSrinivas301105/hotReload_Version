import chokidar from 'chokidar';
import debounce from 'lodash.debounce';

export function fileWatcher(root, onChange){
    const watch = chokidar.watch(root, {
        ignored: [
            /(^|[\/\\])\../, // hidden files
            /node_modules/,
            /\.git/,
            /\.dist/,
            /build/,
            /dist/,
            /bin/,
            /\.exe$/,
            /~$/, // temp files
            /\.swp$/, // vim temp
            /\.tmp$/
        ],
        persistent: true,
        ignoreInitial: true
    });

    const debouncedChange = debounce((path) => {
        console.log("[hotreload] File changed:", path);
        onChange();
    }, 200);
    
    watch.on("change", debouncedChange);
    watch.on("add", debouncedChange);
    watch.on("unlink", debouncedChange);
    watch.on("addDir", debouncedChange);
    
    watch.on("error", error => console.error("[hotreload] Watcher error:", error));
    
    console.log("[hotreload] Watching:", root);
}