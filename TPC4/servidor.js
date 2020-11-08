var http = require('http')
var fs = require('fs')
var aux = require('./mymod.js')

const HTTP_HEADER={'Content-Type':'text/html;charset=utf-8;'};

function serve_file(res,filename,code=200)
{
    fs.readFile(filename,(err,data) =>
    {
        res.writeHead(200,HTTP_HEADER);
        res.write(data);
        res.end();
    });
}

http.createServer(function(req,res){
    console.log(req.method + " " + req.url + " "+ aux.myDateTime())

    if(req.url.match(/(\/index\.html)|(\/0)$/)) 
    {
        serve_file(res, 'website/index.html');
    }

    else
        if(req.url.match(/\/arq\/[1-9]|[0-9][0-9]|1[0-1][0-9]|12[0-2]$/)){
            var num  = req.url.split("/")[2]
            if(num < 123)
                serve_file(res, 'website/arq' + num + '.html');
            else{
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                res.write("<p>O arquiossítio não existe.</p>")
                res.end()
            }
            
        }
    
        else {
            // serve_file(res,'404.html',404);
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write("<p>O URL não corresponde ao esperado.</p>")
            res.end()
        }
}).listen(7777);

console.log('Servidor à escuta na porta 7777...')

