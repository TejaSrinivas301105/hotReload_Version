# Test API Server

Simple HTTP server for testing the hotreload tool.

## Usage

Run with hotreload:
```bash
hotreload --root ./test-api --build "echo Building..." --exec "node index.js"
```

## Test Hot Reload

1. Start the server with hotreload
2. Visit http://localhost:3000
3. Edit `index.js` - change "Version 1.0" to "Version 2.0"
4. Save the file
5. Server automatically rebuilds and restarts
6. Refresh browser to see changes

## Test Crash Loop Prevention

Run crash test:
```bash
hotreload --root ./test-api --build "echo Building..." --exec "node crash-test.js"
```

Then edit `trigger.js` multiple times quickly to trigger rebuilds.
After 3 quick crashes, you'll see: "Server crashed too many times. Waiting 10 seconds..."
