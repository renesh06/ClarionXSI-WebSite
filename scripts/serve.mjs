import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT||3000);
const host=process.env.HOST||'127.0.0.1';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.json':'application/json'};
export async function handleRequest(req,res){
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end('Method not allowed');return;}
  let pathname;
  try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Bad request');return;}
  if(pathname.includes('\0')||pathname.includes('\\')){res.writeHead(400);res.end('Bad request');return;}
  if(pathname.endsWith('/'))pathname+='index.html';
  const target=path.resolve(root,'.'+pathname);
  if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  try{
    if(!(await stat(target)).isFile())throw new Error('Not a file');
    const body=await readFile(target);
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});
    res.end(req.method==='HEAD'?undefined:body);
  }catch{
    const body=await readFile(path.join(root,'404.html'));
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:body);
  }
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const server=http.createServer(handleRequest);
  server.on('error',error=>{console.error(`Unable to launch: ${error.message}`);process.exitCode=1;});
  server.listen(port,host,()=>console.log(`ClarionXSI is running at http://${host}:${port}\nPress Ctrl+C to stop.`));
}
