const { spawnSync } = require('child_process');
const r = spawnSync('npx', ['--no-install', 'vitest', 'run', ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(r.status === null ? 1 : r.status);
