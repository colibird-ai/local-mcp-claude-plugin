#!/usr/bin/env node
// Starts the LMCP server that the LMCP app installed on this computer.
// No dependencies, no network: if the app is not installed, it says so and exits 1.
// stdout is the MCP channel, so this script only ever writes to stderr.
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DOWNLOAD = 'https://www.local-mcp.com/download';

// The same paths the LMCP installer writes into AI client configs.
function server() {
  if (process.platform === 'win32') {
    const base = process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData', 'Local');
    return { bin: path.join(base, 'local-mcp', 'bin', 'lmcp-server.exe'), args: [] };
  }
  return { bin: path.join(os.homedir(), '.local', 'share', 'local-mcp', 'bin', 'local-mcp-server'), args: ['stdio'] };
}

const { bin, args } = server();
if (!fs.existsSync(bin)) {
  process.stderr.write(`LMCP is not installed: install it from ${DOWNLOAD} (expected ${bin})\n`);
  process.exit(1);
}

const child = spawn(bin, args, { stdio: 'inherit' });
const SIGNALS = ['SIGINT', 'SIGTERM', 'SIGHUP'];
for (const sig of SIGNALS) process.on(sig, () => child.kill(sig));

child.on('error', (err) => {
  process.stderr.write(`LMCP server could not start (${bin}): ${err.message}. Reinstall it from ${DOWNLOAD}\n`);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  if (signal) process.exit(128 + (os.constants.signals[signal] || 0));
  process.exit(code === null ? 1 : code);
});
