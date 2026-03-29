const http = require('http');
const server = require('../app');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

function runTests() {
  console.log('\n Running Hello World Tests...\n');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => { data += chunk; });

    res.on('end', () => {
      assert(res.statusCode === 200, `Status code is 200 (got ${res.statusCode})`);
      assert(data.trim() === 'Hello, World!', `Response body is "Hello, World!" (got "${data.trim()}")`);

      console.log(`\n Results: ${passed} passed, ${failed} failed\n`);
      server.close();
      process.exit(failed > 0 ? 1 : 0);
    });
  });

  req.on('error', (err) => {
    console.error('Test request failed:', err.message);
    process.exit(1);
  });

  req.end();
}

// Wait for server to be ready
server.on('listening', runTests);
server.listen(3000);
