// 无头验证：提取 world-class-ai-forge.html 内联脚本并用 Node 运行
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'world-class-ai-forge.html'), 'utf8');
const m = html.match(/<script id="forge">([\s\S]*?)<\/script>/);
if (!m) { console.error('未找到 forge 脚本'); process.exit(2); }
// 在独立作用域中执行；脚本内已检测无 document 自动走 node 分支并打印/设置 exitCode
const vm = require('vm');
const ctx = { console, process, Math, Array, Object, JSON };
vm.createContext(ctx);
try { vm.runInContext(m[1], ctx); } catch (e) { console.error('运行异常:', e); process.exit(3); }
process.exit(ctx.process ? (ctx.process.exitCode || 0) : 0);
