import chokidar from 'chokidar';
import debounce from 'lodash.debounce';

export function fileWatcher(root, onChange){
    const watch = chokidar.watch(root, {
        ignored: /node_modules/,
        persistent: true,
        ignoreInitial: true
    });

    const debouncedChange = debounce(onChange, 200);
    watch.on("change", debouncedChange);
    watch.on("add", debouncedChange);
    watch.on("unlink", debouncedChange);
    console.log("[hotreload] Watching:", root);
}