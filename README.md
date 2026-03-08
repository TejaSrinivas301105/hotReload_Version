# Hotreload

A CLI tool that watches your project for file changes and automatically rebuilds and restarts your server. No more manual restarts during development!

## Features

- 🔄 **Auto-rebuild** - Automatically rebuilds when files change
- 🚀 **Auto-restart** - Restarts server after successful build
- 🛡️ **Crash protection** - Prevents infinite restart loops
- 📁 **Smart watching** - Ignores build artifacts, node_modules, .git
- ⚡ **Fast** - Debounced file changes, restarts in under 2 seconds
- 🌳 **Process cleanup** - Kills all child processes properly
- 📊 **Real-time logs** - Streams server output in real-time

## Installation

```bash
npm install
npm link
```

## Usage

```bash
hotreload --root <project-folder> --build "<build-command>" --exec "<run-command>"
```

### Parameters

- `--root <path>` - Directory to watch for changes
- `--build <command>` - Command to build your project
- `--exec <command>` - Command to run your server

### Examples

**Node.js project:**
```bash
hotreload --root ./myapp --build "npm run build" --exec "node dist/index.js"
```

**Go project:**
```bash
hotreload --root ./myapp --build "go build -o bin/server main.go" --exec "./bin/server"
```

**Simple project:**
```bash
hotreload --root . --build "echo Building..." --exec "node index.js"
```

## How It Works

1. **Initial Build** - Runs build command on startup
2. **Start Server** - Starts your server
3. **Watch Files** - Monitors directory for changes
4. **Detect Change** - File change detected (debounced 200ms)
5. **Stop Server** - Gracefully stops running server
6. **Rebuild** - Runs build command
7. **Restart** - Starts server with new code

## Crash Loop Prevention

If your server crashes 3 times within 3 seconds, hotreload will:
- Display warning message
- Wait 10 seconds before retrying
- Reset counter after successful run

This prevents infinite restart loops that consume CPU/memory.

## File Filtering

Automatically ignores:
- `.git/` - Version control
- `node_modules/` - Dependencies
- `build/`, `dist/`, `bin/` - Build artifacts
- `.exe` files - Compiled binaries
- Hidden files (`.env`, `.gitignore`)
- Temp files (`~`, `.swp`, `.tmp`)

## Demo

Test with the included demo server:

```bash
cd test-api
hotreload --root . --build "echo Building..." --exec "node index.js"
```

Then:
1. Visit http://localhost:3000
2. Edit `test-api/index.js` - change version number
3. Save file
4. Browser automatically refreshes with changes!

### Test Crash Loop Prevention

```bash
hotreload --root ./test-api --build "echo Building..." --exec "node crash-test.js"
```

Edit `trigger.js` multiple times quickly to see crash protection in action.

## Project Structure

```
Hotreload/
├── CLI/
│   └── parseArgs.js       # Command-line argument parsing
├── Build/
│   └── bulider.js         # Build command execution
├── Process/
│   └── Server_Managment.js # Server start/stop/crash detection
├── File_Watcher/
│   └── watcher.js         # File system watching
├── test-api/              # Demo HTTP server
│   ├── index.js           # Main demo server
│   ├── crash-test.js      # Crash loop test
│   └── trigger.js         # File change trigger
├── index.js               # Main entry point
└── package.json

```

## Dependencies

- `chokidar` - File system watching
- `commander` - CLI argument parsing
- `tree-kill` - Process tree termination
- `lodash.debounce` - Event debouncing

## Requirements

- Node.js v14+
- npm or yarn

## Troubleshooting

**Changes not detected?**
- Ensure you're watching the correct directory
- Check if files are in ignored patterns
- Some editors use temp files - try different editor

**Server won't stop?**
- Uses `tree-kill` to terminate entire process tree
- Waits for graceful shutdown before force kill

**Too many rebuilds?**
- File changes are debounced (200ms)
- Multiple rapid changes trigger single rebuild

## License

ISC
