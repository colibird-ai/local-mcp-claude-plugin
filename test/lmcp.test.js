// Self-check of bin/lmcp.js on macOS (or any POSIX): `node test/lmcp.test.js`.
// Uses a fake server under a temporary HOME; never runs the real LMCP server.
'use strict';
const assert = require('assert');
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LAUNCHER = path.join(__dirname, '..', 'bin', 'lmcp.js');
const tmp = (n) => fs.mkdtempSync(path.join(os.tmpdir(), `lmcp-${n}-`));
function fakeServer(script) {
  const home = tmp('home');
  const dir = path.join(home, '.local', 'share', 'local-mcp', 'bin');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'local-mcp-server'), `#!/bin/sh\n${script}\n`, { mode: 0o755 });
  return home;
}
const env = (home) => ({ ...process.env, HOME: home });

// 1. Runs the installed server with `stdio`, passes stdin/stdout through and propagates the exit code.
{
  const home = fakeServer('echo "args:$*"; read l; echo "got:$l"; exit 7');
  const r = spawnSync(process.execPath, [LAUNCHER], { env: env(home), input: 'hello\n', encoding: 'utf8' });
  assert.strictEqual(r.stdout, 'args:stdio\ngot:hello\n');
  assert.strictEqual(r.stderr, '');
  assert.strictEqual(r.status, 7);
}

// 2. Without LMCP installed: exit 1, a clear message on stderr, nothing on stdout.
{
  const r = spawnSync(process.execPath, [LAUNCHER], { env: env(tmp('empty')), encoding: 'utf8' });
  assert.strictEqual(r.status, 1);
  assert.strictEqual(r.stdout, '');
  assert.match(r.stderr, /LMCP is not installed: install it from https:\/\/www\.local-mcp\.com\/download/);
}

// 3. A binary that cannot be executed: exit 1 with a message, no crash.
{
  const home = fakeServer('exit 0');
  fs.chmodSync(path.join(home, '.local', 'share', 'local-mcp', 'bin', 'local-mcp-server'), 0o644);
  const r = spawnSync(process.execPath, [LAUNCHER], { env: env(home), encoding: 'utf8' });
  assert.strictEqual(r.status, 1);
  assert.match(r.stderr, /could not start/);
}

// 4. SIGTERM to the launcher reaches the server, and the server's exit code comes back.
{
  const home = fakeServer('trap \'echo term; exit 3\' TERM; echo ready; while :; do sleep 0.1; done');
  const p = spawn(process.execPath, [LAUNCHER], { env: env(home) });
  let out = '';
  const timer = setTimeout(() => { p.kill('SIGKILL'); assert.fail(`timeout, stdout=${out}`); }, 10000);
  p.stdout.on('data', (d) => {
    out += d;
    if (out === 'ready\n') p.kill('SIGTERM');
  });
  p.on('exit', (code) => {
    clearTimeout(timer);
    assert.strictEqual(out, 'ready\nterm\n');
    assert.strictEqual(code, 3);
    console.log('lmcp.js self-check OK (4 cases)');
  });
}
