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
        ignoreInitial: true,
        usePolling: false,
        awaitWriteFinish: {
            stabilityThreshold: 200,
            pollInterval: 100
        }
    });

    const debouncedChange = debounce((path) => {
        console.log("[hotreload] File changed:", path);
        onChange();
    }, 200);
    
    watch.on("change", debouncedChange);
    watch.on("add", debouncedChange);
    watch.on("unlink", debouncedChange);
    watch.on("addDir", debouncedChange);
    
    watch.on("error", (error) => {
        if (error.code === 'ENOSPC') {
            console.error("[hotreload] ERROR: File watch limit reached!");
            console.error("[hotreload] Increase system limit or use --usePolling flag");
            console.error("[hotreload] Linux: sudo sysctl fs.inotify.max_user_watches=524288");
        } else {
            console.error("[hotreload] Watcher error:", error);
        }
    });
    
    console.log("[hotreload] Watching:", root);
}