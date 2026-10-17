import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('./dist/',import.meta.url);
const types={html:'text/html',css:'text/css',js:'text/javascript',svg:'image/svg+xml'};
http.createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname); const target=new URL('.'+(path==='/'?'/index.html':path),root); if(!fileURLToPath(target).startsWith(fileURLToPath(root))){res.writeHead(403);return res.end();} const data=await readFile(target);res.writeHead(200,{'Content-Type':types[path.split('.').pop()]||'text/html','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}}).listen(4173,'127.0.0.1',()=>console.log('ReLoop: http://127.0.0.1:4173'));
