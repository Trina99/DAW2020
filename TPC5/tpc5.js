var http = require('http')
var axios = require('axios')
var aux = require('./uteis.js')

http.createServer(function(req,res){
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de instrumentos</a></li>')
            res.write('</ul>')
        }
        else{ 
            if(req.url == '/alunos'){
                aux.get_alunos(res)
            }
            else{ 
                if(req.url == '/cursos'){
                    aux.get_cursos(res)
                }
                else{ 
                    if(req.url == '/instrumentos'){
                        aux.get_instrumentos(res)
                    }
                    else{
                        if(req.url.match(/\/alunos\/page[0-9]+/)){
                            pag = req.url.substring(12)
                            console.log(pag)
                            aux.get_alunos(res, pag)
                        }
                        else{
                            if(req.url.match(/\/alunos\/A(E-)?[0-9]{2,5}/)){
                                id = req.url.substring(8)
                                console.log(id)
                                aux.get_aluno(res, id)
                            }
                            else{
                                if(req.url.match(/\/cursos\/C(B|S)[0-9][0-9]?/)){
                                    id = req.url.substring(8)
                                    console.log(id)
                                    aux.get_curso(res, id)
                                }

                                else{
                                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                                    res.write("<p>Pedido não suportado: " + req.method + " - " + req.url + "</p>")
                                    res.end()
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write("<p>Pedido não suportado: " + req.method + " - " + req.url + "</p>")
        res.end()
    }
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')

