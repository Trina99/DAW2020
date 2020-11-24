var http = require('http')
var axios = require('axios')
var fs = require('fs')
var uteis = require('./uteis')

var { parse } = require('querystring')



// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    // Tratamento do pedido
    if (uteis.recursoEstatico(req)) {
        uteis.sirvoRecursoEstatico(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                // GET /taks --------------------------------------------------------------------
                if ((req.url == "/") || (req.url == "/list")) {
                    axios.get("http://localhost:3000/list")
                        .then(response => {
                            var tasks = response.data
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(uteis.geraMainPag(tasks, d))
                            res.end()
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas...")
                            res.end()
                        })
                }
                // GET /list/:id --------------------------------------------------------------------
                // else if(/\/list\[0-9]+$/.test(req.url)){
                //     var idTask = req.url.split("/")[2]
                //     axios.get("http://localhost:3000/list/" + idTask)
                //         .then( response => {
                //             let t = response.data

                //             res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                //             res.write(geraPagAluno(t, d))
                //             res.end()
                //         })
                //         .catch(function(erro){
                //             res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                //             res.write("<p>Não foi possível obter a tarefa")
                //             res.end()
                //         })
                // }
                // GET /list/register --------------------------------------------------------------------
                else if (req.url == "/list/register") {
                    console.log("tentativa de add task")
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write(uteis.geraFormTask(d))
                    res.end()
                }
                // GET /alunos/:id/edit --------------------------------------------------------------------
                else if (/\/list\/edit\/[0-9]+$/.test(req.url)) {
                    var idTask = req.url.split("/")[3]
                    // console.log("id:" + idTask)
                    axios.get("http://localhost:3000/list/" + idTask)
                        .then(response => {
                            let t = response.data
                            // console.log(t)
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(uteis.geraEditTask(t, d))
                            res.end()
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a tarefa...")
                            res.end()
                        })
                }
                else if (/\/list\/delete\/[0-9]+$/.test(req.url)) {
                    console.log("delete task")
                    id = req.url.split("/")[3]
                    axios.delete('http://localhost:3000/list/' + id)
                        .then(resp => {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            console.log(resp)
                            res.write(uteis.geraConfirm(resp.data, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write('<p>Erro no PUT: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if (req.url == '/list') {
                    uteis.recuperaInfo(req, resultado => {
                        console.log('task POST:' + JSON.stringify(resultado))
                        console.log(resultado)
                        axios.post('http://localhost:3000/list', resultado)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write(uteis.geraConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                else if (/\/list\/[0-9]+$/.test(req.url)) {
                    id = req.url.split("/")[2]
                    uteis.recuperaInfo(req, resultado => {
                        console.log('task PUT:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/list/' + id, resultado)
                            .then(resp => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write(uteis.geraConfirm(resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no PUT: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                break
            case "DELETE":
                // GET /list/register --------------------------------------------------------------------

                break;
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')