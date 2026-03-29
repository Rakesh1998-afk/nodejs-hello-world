const http = require('http');
const server = require('../app');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { console.log(`  ✅ PASS: ${message}`); passed++; }
  else { console.error(`  ❌ FAIL: ${message}`); failed++; }
}

const options = { hostname: 'localhost', port: 3000, path: '/', method: 'GET' };

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    assert(res.statusCode === 200, `Status code is 200 (got ${res.statusCode})`);
    assert(data.trim() === 'Hello, World!', `Response is "Hello, World!"`);
    console.log(`\n Results: ${passed} passed, ${failed} failed\n`);
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  });
});

req.on('error', (err) => { console.error('Test failed:', err.message); process.exit(1); });
req.end();

server.on('listening', () => req.end);
server.listen(3000);
