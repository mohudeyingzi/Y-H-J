// forging-server.js - 锻件算重报价系统 跨设备同步服务器
// 用法: node forging-server.js [端口]  (默认 8080)
// 手机访问: http://电脑IP:8080

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const PORT       = Number(process.argv[2]) || 8080;
const HTML_FILE  = path.join(__dirname, 'forging-calculator-template.html');
const DATA_FILE  = path.join(__dirname, 'forging-records.json');
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ── 工具 ──────────────────────────────────────────────
function readJSON() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); }
  catch { return []; }
}
function writeJSON(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
function send(res, code, body, type) {
  const b = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(code, {
    'Content-Type':   type || 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(b),
    ...CORS_HEADERS,
  });
  res.end(b);
}
function readBody(req) {
  return new Promise((ok, fail) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => ok(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', fail);
  });
}

// ── 路由 ──────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const u = url.parse(req.url, true);
  const p = u.pathname;

  if (req.method === 'OPTIONS') { res.writeHead(204, CORS_HEADERS); return res.end(); }

  // GET /  → 返回 HTML
  if (p === '/' && req.method === 'GET') {
    try {
      const html = fs.readFileSync(HTML_FILE, 'utf-8')
        .replace('</head>',
          '<script>window.__SERVER_MODE=1;</script>\n</head>');
      return send(res, 200, html, 'text/html; charset=utf-8');
    } catch {
      return send(res, 404, {error:'HTML文件不存在，请确认 forging-calculator-template.html 在同一目录'}, 'text/html; charset=utf-8');
    }
  }

  // GET /api/records  → 返回全部记录
  if (p === '/api/records' && req.method === 'GET') {
    return send(res, 200, readJSON());
  }

  // POST /api/records  → 覆盖写入
  if (p === '/api/records' && req.method === 'POST') {
    try {
      const data = JSON.parse(await readBody(req));
      if (!Array.isArray(data)) return send(res, 400, {error:'数据必须是数组'});
      writeJSON(data);
      return send(res, 200, {ok:true, count:data.length});
    } catch (e) {
      return send(res, 400, {error:'JSON解析失败: '+e.message});
    }
  }

  // GET /api/ping  → 心跳
  if (p === '/api/ping') return send(res, 200, {ok:true, time:Date.now()});

  send(res, 404, {error:'Not Found'});
});

// ── 启动 ──────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const ifaces = os.networkInterfaces();
  const ips = [];
  for (const k in ifaces)
    for (const a of ifaces[k])
      if (a.family === 'IPv4' && !a.internal) ips.push(a.address);

  console.log('\n✅ 锻件算重报价系统 服务器已启动');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('电脑访问:   http://localhost:' + PORT);
  ips.forEach(ip => console.log('手机访问:   http://' + ip + ':' + PORT));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('按 Ctrl+C 停止\n');
});
